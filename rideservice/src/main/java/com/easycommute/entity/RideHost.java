package com.easycommute.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "ride_hosts")
public class RideHost {
    @Id
    private String rideId;
    private String name;
    private String source;
    private String destination;
    private String date;
    private String time;
    private int cost;
    private int seats;


    @GeoSpatialIndexed(type = org.springframework.data.mongodb.core.index.GeoSpatialIndexType.GEO_2DSPHERE)
    private double[] startLocation; // [longitude, latitude]

    @GeoSpatialIndexed(type = org.springframework.data.mongodb.core.index.GeoSpatialIndexType.GEO_2DSPHERE)
    private double[] destinationLocation; // [longitude, latitude]
}

