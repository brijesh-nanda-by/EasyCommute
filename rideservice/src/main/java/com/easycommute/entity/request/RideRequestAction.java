package com.easycommute.entity.request;

import com.easycommute.util.Location;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RideRequestAction {
    private String rideId;
    private String userId;
    private Location startLocation; // [longitude, latitude]
    private Location destinationLocation; // [longitude, latitude]
}
