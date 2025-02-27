package com.easycommute.controller;

import com.easycommute.dto.request.RideCustomerRequest;
import com.easycommute.entity.RideHost;
import com.easycommute.service.RideMatchingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import java.util.List;

@RestController
@RequestMapping("/match")
@RequiredArgsConstructor
public class RideMatchingController {
    private final RideMatchingService rideMatchingService;

    // API to find suitable ride hosts for a given ride customer request
    @PostMapping("/find")
    public ResponseEntity<List<RideHost>> findMatchingHosts(@RequestBody RideCustomerRequest rideCustomer) {
        return ResponseEntity.ok(rideMatchingService.findMatchingHosts(rideCustomer));
    }
}

