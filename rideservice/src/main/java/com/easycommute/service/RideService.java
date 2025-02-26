package com.easycommute.service;

import com.easycommute.entity.RideData;
import com.easycommute.repository.impl.RideCustomRepositoryImpl;
import com.easycommute.repository.RideRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service("RideService")
@Slf4j
@RequiredArgsConstructor
public class RideService {

    @Autowired
    private RideRepository rideRepository;


    public RideData createRide(RideData ride) {
        return rideRepository.save(ride);
    }

    public List<RideData> getAllRides() {
        return rideRepository.findAll();
    }
}