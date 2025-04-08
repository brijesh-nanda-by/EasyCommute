package com.easycommute.repository.impl;

import com.easycommute.entity.db.RequestedRide;
import com.easycommute.repository.RequestedRideCustomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RequestedRideCustomRepositoryImpl implements RequestedRideCustomRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public RequestedRide findUniqueByRideIdAndUserId(String rideId, String userId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("rideId").is(rideId)
                .and("userId").is(userId));

        List<RequestedRide> results = mongoTemplate.find(query, RequestedRide.class);

        if (results.isEmpty()) {
            return null;
        } else if (results.size() > 1) {
            throw new IllegalStateException("More than one ride found for same rideId and userId");
        } else {
            return results.get(0);
        }
    }
}