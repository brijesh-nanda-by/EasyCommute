package com.easycommute.service;

import com.easycommute.entity.db.RequestedRide;
import com.easycommute.entity.request.RideRequest;
import com.easycommute.entity.db.Ride;
import com.easycommute.entity.request.RideRequestAction;
import com.easycommute.enumeration.RideAction;
import com.easycommute.enumeration.RideStatus;
import com.easycommute.repository.RequestedRideRepository;
import com.easycommute.repository.RideRepository;
import com.easycommute.util.Location;
import com.easycommute.util.RideBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RideService {

    @Autowired
    private final RideRepository rideRepository;

    @Autowired
    private final RequestedRideRepository requestedRideRepository;

    public Ride saveRide(RideRequest rideRequest) {
        return rideRepository.save(RideBuilder.buildride(rideRequest));
    }

    public Ride getRideById(String rideId) {
        return rideRepository.findById(rideId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Ride not found with id: " + rideId));
    }

    public boolean requestRide(RideRequestAction requestAction) {
        RequestedRide requestedRide = new RequestedRide();
        requestedRide.setRideId(requestAction.getRideId());
        requestedRide.setUserId(requestAction.getUserId());
        requestedRide.setCustomerName(requestAction.getCustomerName());
        requestedRide.setRideStatus(RideStatus.REQUESTED);
        requestedRide.setStartLocation(new Location(requestAction.getStartLocation().getLongitude(), requestAction.getStartLocation().getLatitude()));
        requestedRide.setDestinationLocation(new Location(requestAction.getDestinationLocation().getLongitude(), requestAction.getDestinationLocation().getLatitude()));
        requestedRideRepository.save(requestedRide);
        return true;
    }

    public List<RequestedRide> getRidesByUserAndStatus(String userId, RideStatus status) {
        return requestedRideRepository.findByUserIdAndRideStatus(userId, status);
    }
    public List<RequestedRide> getRequestsByRideIdAndRequestStatus(String rideId, RideStatus requestStatus){
        return requestedRideRepository.findByRideIdAndRideStatus(rideId, requestStatus);
    }

    public boolean handleRideAction(String rideId, String userId, RideAction action) {
        // Step 1: Get the requested ride
        RequestedRide requestedRide = requestedRideRepository.findUniqueByRideIdAndUserId(rideId, userId);
        if (requestedRide == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Requested ride not found");
        }

        // Step 2: Get the main ride
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ride not found"));

        // Step 3: Handle action
        switch (action) {
            case APPROVE:
                // Update requested ride status
                requestedRide.setRideStatus(RideStatus.APPROVED);
                requestedRideRepository.save(requestedRide);

                // Update ride info
                ride.setRemainingSeats(ride.getRemainingSeats() - 1);
                ride.setRideStatus(RideStatus.APPROVED); // optional: depends on your logic

                // Add to confirmed customers
                if (ride.getConfirmedCustomers() == null) {
                    ride.setConfirmedCustomers(new ArrayList<>());
                }
                ride.getConfirmedCustomers().add(requestedRide);

                break;

            case DENY:
                requestedRide.setRideStatus(RideStatus.REJECTED);
                requestedRideRepository.save(requestedRide);
                break;

            default:
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid action");
        }

        // Step 4: Save the updated ride
        rideRepository.save(ride);

        return true;
    }

}

