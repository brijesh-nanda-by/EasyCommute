package com.easycommute.entity.request;

import com.easycommute.util.Location;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RideMatchRequest {
//    private String customerId; // Unique ID of the customer
    private Location startLocation; // [longitude, latitude]
    private Location destinationLocation; // [longitude, latitude]
    private String date;
}
