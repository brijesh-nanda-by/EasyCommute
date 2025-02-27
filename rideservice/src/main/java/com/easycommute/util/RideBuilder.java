package com.easycommute.util;

import com.easycommute.dto.request.RideHostRequest;
import com.easycommute.entity.RideHost;

public class RideBuilder {

    public static RideHost buildRideHost(RideHostRequest rideHostRequest){
        RideHost rideHost=new RideHost();
        rideHost.setHostId(rideHostRequest.getHostId());
        rideHost.setStartLocation(new double[]{rideHostRequest.getStartLocation().getLatitude(),rideHostRequest.getStartLocation().getLongitude()});
        rideHost.setDestinationLocation(new double[]{rideHostRequest.getDestinationLocation().getLatitude(),rideHostRequest.getDestinationLocation().getLongitude()});
        return rideHost;
    }
}
