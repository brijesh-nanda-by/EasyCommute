package com.easycommute.service;

import com.easycommute.entity.request.RideRequest;
import com.easycommute.entity.db.Ride;
import com.easycommute.entity.request.RideRequestAction;
import com.easycommute.enumeration.RideStatus;
import com.easycommute.repository.RideRepository;
import com.easycommute.util.RideBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class RideService {

    @Autowired
    private final RideRepository rideRepository;

    public Ride saveRide(RideRequest rideRequest) {
        return rideRepository.save(RideBuilder.buildride(rideRequest));
    }

    public Ride getRideById(String rideId) {
        return rideRepository.findById(rideId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Ride not found with id: " + rideId));
    }

    public boolean requestRide(RideRequestAction requestAction) {
        Ride ride = rideRepository.findById(requestAction.getRideId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ride not found"));

        // TODO: Need to fetch the user info based on the userId once it's ready
        ride.setRideStatus(RideStatus.REQUESTED);
        ride.setStartLocation(new GeoJsonPoint(requestAction.getStartLocation().getLongitude(), requestAction.getStartLocation().getLatitude()));
        ride.setDestinationLocation(new GeoJsonPoint(requestAction.getDestinationLocation().getLongitude(), requestAction.getDestinationLocation().getLatitude()));
        rideRepository.save(ride);
        return true;
    }

}

