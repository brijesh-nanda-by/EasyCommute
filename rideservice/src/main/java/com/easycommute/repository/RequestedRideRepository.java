package com.easycommute.repository;

import com.easycommute.entity.db.RequestedRide;
import com.easycommute.entity.db.Ride;
import com.easycommute.enumeration.RideStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RequestedRideRepository extends MongoRepository<RequestedRide, String>, RequestedRideCustomRepository{

    RequestedRide findByRideIdAndUserId(String rideId, String userId);
    List<RequestedRide> findByUserIdAndRideStatus(String userId, RideStatus rideStatus);
    List<RequestedRide> findByRideIdAndRideStatus(String rideId, RideStatus rideStatus);

}
