package com.easycommute.service;

import com.easycommute.entity.request.RideRequest;
import com.easycommute.entity.db.Ride;
import com.easycommute.repository.RideRepository;
import com.easycommute.util.RideBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RideService {

    @Autowired
    private final RideRepository rideRepository;

    public Ride saveRide(RideRequest rideRequest) {
        return rideRepository.save(RideBuilder.buildride(rideRequest));
    }
}

