package com.easycommute.service;

import com.easycommute.entity.request.RideMatchRequest;
import com.easycommute.entity.db.Ride;
import com.easycommute.repository.RideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Metrics;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RideMatchingService {

    @Autowired
    private final RideRepository rideRepository;
    private final Integer MAX_DISTANCE = 10;

    public List<Ride> findMatchingRides(RideMatchRequest rideMatchRequest) {
        Point customerStart = new Point(rideMatchRequest.getStartLocation().getLongitude(), rideMatchRequest.getStartLocation().getLatitude());
        Point customerDestination = new Point(rideMatchRequest.getDestinationLocation().getLongitude(), rideMatchRequest.getDestinationLocation().getLatitude());

        Distance maxDistance = new Distance(MAX_DISTANCE, Metrics.MILES); // 10 miles search radius

        // Find hosts who start near the customer's start location
        List<Ride> nearbyRides = rideRepository.findByStartLocationNear(customerStart, maxDistance);

        // Further filter by destination proximity
        return nearbyRides.stream()
                .filter(ride -> isDestinationNearby(ride, customerDestination, maxDistance))
                .filter(ride -> ride.getDate()!=null && ride.getDate().equals(rideMatchRequest.getDate()))
                .collect(Collectors.toList());
    }

    private boolean isDestinationNearby(Ride ride, Point customerDestination, Distance maxDistance) {
        List<Ride> matches = rideRepository.findByDestinationLocationNear(customerDestination, maxDistance);
        return matches.contains(ride);
    }


}

