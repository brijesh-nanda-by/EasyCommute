package com.easycommute.service;

import com.easycommute.dto.request.RideCustomerRequest;
import com.easycommute.entity.RideHost;
import com.easycommute.repository.RideHostRepository;
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
    private final RideHostRepository rideHostRepository;

    public List<RideHost> findMatchingHosts(RideCustomerRequest rideCustomer) {
        Point customerStart = new Point(rideCustomer.getStartLocation()[0], rideCustomer.getStartLocation()[1]);
        Point customerDestination = new Point(rideCustomer.getDestinationLocation()[0], rideCustomer.getDestinationLocation()[1]);

        Distance maxDistance = new Distance(10, Metrics.KILOMETERS); // 10 km search radius

        // Find hosts who start near the customer's start location
        List<RideHost> nearbyHosts = rideHostRepository.findByStartLocationNear(customerStart, maxDistance);

        // Further filter by destination proximity
        return nearbyHosts.stream()
                .filter(host -> isDestinationNearby(host, customerDestination, maxDistance))
                .collect(Collectors.toList());
    }

    private boolean isDestinationNearby(RideHost host, Point customerDestination, Distance maxDistance) {
        List<RideHost> matches = rideHostRepository.findByDestinationLocationNear(customerDestination, maxDistance);
        return matches.contains(host);
    }
}

