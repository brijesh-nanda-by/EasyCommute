package com.easycommute.util;

import com.easycommute.entity.request.RideRequest;
import com.easycommute.entity.db.Ride;
import com.easycommute.enumeration.RideStatus;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;

public class RideBuilder {

    public static Ride buildride(RideRequest rideRequest){
        Ride ride=new Ride();
        ride.setUserId(rideRequest.getUserId());
        ride.setHostName(rideRequest.getHostName());
        ride.setHostSource(rideRequest.getSource());
        ride.setHostDestination(rideRequest.getDestination());
        ride.setCost(rideRequest.getCost());
        ride.setTotalSeats(rideRequest.getSeats());
        ride.setRemainingSeats(rideRequest.getSeats());
        ride.setDate(rideRequest.getDate());
        ride.setTime(rideRequest.getTime());
        ride.setRideStatus(RideStatus.CREATED);
        ride.setStartLocation(new GeoJsonPoint(rideRequest.getStartLocation().getLongitude(), rideRequest.getStartLocation().getLatitude()));
        ride.setDestinationLocation(new GeoJsonPoint(rideRequest.getDestinationLocation().getLongitude(), rideRequest.getDestinationLocation().getLatitude()));
        return ride;
    }
}
