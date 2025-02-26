package com.easycommute.controllers;

import com.easycommute.entity.RideData;
import com.easycommute.service.RideService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rides")
@Tag(name = "Ride Management", description = "APIs for hosting and listing rides")
public class RideController {

    @Autowired
    private RideService rideService;

    @Operation(summary = "List all Rides", description = "Retrieves a list of all rides.")
    @GetMapping("/list")
    public List<RideData> getAllRides() {
        return rideService.getAllRides();
    }

    @PostMapping("/create")
    public RideData createRide(@RequestBody RideData ride) {
        return rideService.createRide(ride);
    }
}