package com.easycommute.service;

import com.easycommute.dto.request.RideHostRequest;
import com.easycommute.entity.RideHost;
import com.easycommute.repository.RideHostRepository;
import com.easycommute.util.RideBuilder;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RideHostService {
    private final RideHostRepository rideHostRepository;

    public RideHost saveRideHost(RideHostRequest rideHostRequest) {
        return rideHostRepository.save(RideBuilder.buildRideHost(rideHostRequest));
    }
}

