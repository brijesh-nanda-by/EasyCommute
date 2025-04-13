package com.easycommute.controller;

import com.easycommute.entity.db.RequestedRide;
import com.easycommute.entity.request.RideRequest;
import com.easycommute.entity.db.Ride;
import com.easycommute.entity.request.RideMatchRequest;
import com.easycommute.entity.request.RideRequestAction;
import com.easycommute.enumeration.RideAction;
import com.easycommute.enumeration.RideStatus;
import com.easycommute.service.RideMatchingService;
import com.easycommute.service.RideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/ride")
@RequiredArgsConstructor
@CrossOrigin
public class RideController {

    private final RideService rideService;
    private final RideMatchingService rideMatchingService;

    // Save a new ride host entry
    @PostMapping("/create")
    public ResponseEntity<Ride> createRide(@RequestBody RideRequest rideRequest) {
        return ResponseEntity.ok(rideService.saveRide(rideRequest));
    }

    // API to find suitable ride hosts for a given ride customer request
    @PostMapping("/match")
    public ResponseEntity<List<Ride>> findMatchingRides(@RequestBody RideMatchRequest rideMatchRequest) {
        return ResponseEntity.ok(rideMatchingService.findMatchingRides(rideMatchRequest));
    }

    @GetMapping("/details/{rideId}")
    public ResponseEntity<Ride> getRideDetails(@PathVariable String rideId) {
        return ResponseEntity.ok(rideService.getRideById(rideId));
    }

    @PostMapping("/request")
    public ResponseEntity<Boolean> requestRide(@RequestBody RideRequestAction request) {
        try {
            rideService.requestRide(request);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }

    @GetMapping("/requestedRides")
    public ResponseEntity<List<RequestedRide>> getRidesByUserAndStatus(
            @RequestParam String userId,
            @RequestParam RideStatus status) {
        return ResponseEntity.ok(rideService.getRidesByUserAndStatus(userId, status));
    }

    @GetMapping("/host/requests")
    public ResponseEntity<List<RequestedRide>> getRequestsByRideIdAndRequestStatus(
            @RequestParam String rideId,
            @RequestParam RideStatus requestStatus) {
        return ResponseEntity.ok(rideService.getRequestsByRideIdAndRequestStatus(rideId, requestStatus));
    }

    @PostMapping("/{rideId}/action")
    public ResponseEntity<Boolean> handleRideAction(
            @PathVariable String rideId,
            @RequestParam String userId,
            @RequestParam RideAction action) {
        return ResponseEntity.ok(rideService.handleRideAction(rideId, userId, action));
    }
}

