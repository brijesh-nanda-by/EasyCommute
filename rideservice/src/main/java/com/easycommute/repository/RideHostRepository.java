package com.easycommute.repository;

import com.easycommute.entity.RideHost;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RideHostRepository extends MongoRepository<RideHost, String> {
    // Find hosts whose start location is near the customer's start location
    List<RideHost> findByStartLocationNear(Point start, Distance maxDistance);

    // Find hosts whose destination location is near the customer's destination
    List<RideHost> findByDestinationLocationNear(Point destination, Distance maxDistance);
}

