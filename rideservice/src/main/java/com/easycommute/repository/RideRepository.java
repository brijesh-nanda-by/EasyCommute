package com.easycommute.repository;

import com.easycommute.entity.db.Ride;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RideRepository extends MongoRepository<Ride, String> {
    // Find hosts whose start location is near the customer's start location
    List<Ride> findByStartLocationNear(Point start, Distance maxDistance);

    // Find hosts whose destination location is near the customer's destination
    List<Ride> findByDestinationLocationNear(Point destination, Distance maxDistance);
}

