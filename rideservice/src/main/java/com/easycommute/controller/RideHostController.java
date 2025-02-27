package com.easycommute.controller;

import com.easycommute.dto.request.RideHostRequest;
import com.easycommute.entity.RideHost;
import com.easycommute.service.RideHostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/hosts")
@RequiredArgsConstructor
public class RideHostController {
    private final RideHostService rideHostService;

    // Save a new ride host entry
    @PostMapping("/add")
    public ResponseEntity<RideHost> addRideHost(@RequestBody RideHostRequest rideHost) {
        return ResponseEntity.ok(rideHostService.saveRideHost(rideHost));
    }
}

