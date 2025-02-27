package com.easycommute.dto.request;

import com.easycommute.util.Location;
import lombok.Data;

@Data
public class RideHostRequest {
    private String hostId; // User ID of the host
    private Location startLocation;
    private Location destinationLocation;
}

