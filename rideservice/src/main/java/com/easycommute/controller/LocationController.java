package com.easycommute.controller;

import com.easycommute.service.LocationSearchService;
import com.easycommute.util.LocationResponse;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/location")
@RequiredArgsConstructor
public class LocationController {
    private final LocationSearchService locationSearchService;
    @GetMapping("/search")
    public ResponseEntity<List<LocationResponse>> searchLocation(@RequestParam String query) {
        return ResponseEntity.ok(locationSearchService.searchLocation(query));
    }
}

