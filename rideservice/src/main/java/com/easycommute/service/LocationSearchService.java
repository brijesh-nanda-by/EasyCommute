package com.easycommute.service;

import com.easycommute.util.Location;
import com.easycommute.util.LocationResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.List;

@Service
public class LocationSearchService {
    @Value("${google.maps.api.key}")
    private String googleApiKey;

    private static final String GOOGLE_PLACES_URL =
            "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=%s&key=%s";

    private static final String GOOGLE_GEOCODE_URL =
            "https://maps.googleapis.com/maps/api/geocode/json?place_id=%s&key=%s";

    public List<LocationResponse> searchLocation(String query) {
        String url = String.format(GOOGLE_PLACES_URL, query, googleApiKey);
        RestTemplate restTemplate = new RestTemplate();
        List<LocationResponse> locations = new ArrayList<>();

        try {
            // Call Google Places API
            String response = restTemplate.getForObject(url, String.class);
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = objectMapper.readTree(response);
            JsonNode predictions = root.path("predictions");

            for (JsonNode prediction : predictions) {
                String placeName = prediction.path("description").asText();
                String placeId = prediction.path("place_id").asText();

                // Get lat/lng from Geocoding API
                Location location = getCoordinatesFromPlaceId(placeId);
                if (location != null) {
                    locations.add(new LocationResponse(placeName, location.getLatitude(), location.getLongitude()));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return locations;
    }

    private Location getCoordinatesFromPlaceId(String placeId) {
        String url = String.format(GOOGLE_GEOCODE_URL, placeId, googleApiKey);
        RestTemplate restTemplate = new RestTemplate();

        try {
            // Call Google Geocoding API
            String response = restTemplate.getForObject(url, String.class);
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = objectMapper.readTree(response);
            JsonNode results = root.path("results");

            if (results.isArray() && results.size() > 0) {
                JsonNode locationNode = results.get(0).path("geometry").path("location");
                double latitude = locationNode.path("lat").asDouble();
                double longitude = locationNode.path("lng").asDouble();
                return new Location(latitude, longitude);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}

