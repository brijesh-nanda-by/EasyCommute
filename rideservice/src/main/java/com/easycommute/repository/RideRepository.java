package com.easycommute.repository;

import com.easycommute.entity.RideData;
import com.easycommute.repository.impl.RideCustomRepositoryImpl;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RideRepository
        extends MongoRepository<RideData, String>, RideCustomRepository {
    // Use this to fetch data using an indexed field. Like example below
    // List<RideData> findByRideName(String rideName);
}