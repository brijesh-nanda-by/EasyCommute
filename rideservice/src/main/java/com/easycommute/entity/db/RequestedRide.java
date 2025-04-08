package com.easycommute.entity.db;

import com.easycommute.enumeration.RideStatus;
import com.easycommute.util.Location;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "requestedRide")
public class RequestedRide {
    private String rideId;
    private String userId;
    private String customerName;
    private Location startLocation; // [longitude, latitude]
    private Location destinationLocation; // [longitude, latitude]
    private RideStatus rideStatus;
}
