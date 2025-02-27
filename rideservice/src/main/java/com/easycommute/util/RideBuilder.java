package com.easycommute.util;

import com.easycommute.dto.request.RideHostRequest;
import com.easycommute.entity.RideHost;

public class RideBuilder {

    public static RideHost buildRideHost(RideHostRequest rideHostRequest){
        RideHost rideHost=new RideHost();
//        rideHost.setRideId(rideHostRequest.getRideId());
        rideHost.setName(rideHostRequest.getName());
        rideHost.setSource(rideHostRequest.getSource());
        rideHost.setDestination(rideHostRequest.getDestination());
        rideHost.setCost(rideHostRequest.getCost());
        rideHost.setSeats(rideHostRequest.getSeats());
        rideHost.setDate(rideHostRequest.getDate());
        rideHost.setTime(rideHostRequest.getTime());

        rideHost.setStartLocation(new double[]{rideHostRequest.getStartLocation().getLatitude(),rideHostRequest.getStartLocation().getLongitude()});
        rideHost.setDestinationLocation(new double[]{rideHostRequest.getDestinationLocation().getLatitude(),rideHostRequest.getDestinationLocation().getLongitude()});
        return rideHost;
    }
}
