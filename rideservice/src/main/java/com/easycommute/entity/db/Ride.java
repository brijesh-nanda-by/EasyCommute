package com.easycommute.entity.db;

import com.easycommute.enumeration.RideStatus;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "ride")
public class Ride {
    @Id
    private String rideId;
    private String hostName;
    private String hostSource;
    private String hostDestination;
    private String date;
    private String time;
    private int cost;
    private int totalSeats;
    private RideStatus rideStatus;


    @GeoSpatialIndexed(type = org.springframework.data.mongodb.core.index.GeoSpatialIndexType.GEO_2DSPHERE)
    private GeoJsonPoint startLocation; // [longitude, latitude]

    @GeoSpatialIndexed(type = org.springframework.data.mongodb.core.index.GeoSpatialIndexType.GEO_2DSPHERE)
    private GeoJsonPoint destinationLocation; // [longitude, latitude]
}

