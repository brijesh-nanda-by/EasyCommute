package com.easycommute.repository;

import com.easycommute.entity.db.RequestedRide;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RequestedRideRepository extends MongoRepository<RequestedRide, String>, RequestedRideCustomRepository{

    RequestedRide findByRideIdAndUserId(String rideId, String userId);
}
