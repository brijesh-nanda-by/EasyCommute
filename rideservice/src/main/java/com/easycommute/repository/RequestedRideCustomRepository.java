package com.easycommute.repository;

import com.easycommute.entity.db.RequestedRide;

public interface RequestedRideCustomRepository {
    RequestedRide findUniqueByRideIdAndUserId(String rideId, String userId);
}