package com.easycommute.util;

import com.easycommute.entity.request.RideRequest;
import com.easycommute.entity.db.Ride;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;

public class RideBuilder {

    public static Ride buildride(RideRequest rideRequest){
        Ride ride=new Ride();
        ride.setName(rideRequest.getName());
        ride.setSource(rideRequest.getSource());
        ride.setDestination(rideRequest.getDestination());
        ride.setCost(rideRequest.getCost());
        ride.setSeats(rideRequest.getSeats());
        ride.setDate(rideRequest.getDate());
        ride.setTime(rideRequest.getTime());

        ride.setStartLocation(new GeoJsonPoint(rideRequest.getStartLocation().getLongitude(), rideRequest.getStartLocation().getLatitude()));
        ride.setDestinationLocation(new GeoJsonPoint(rideRequest.getDestinationLocation().getLongitude(), rideRequest.getDestinationLocation().getLatitude()));
        return ride;
    }
}
