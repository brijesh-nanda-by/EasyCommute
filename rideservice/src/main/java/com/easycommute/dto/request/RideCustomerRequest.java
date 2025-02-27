package com.easycommute.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RideCustomerRequest {
    private String customerId; // Unique ID of the customer
    private double[] startLocation; // [longitude, latitude]
    private double[] destinationLocation; // [longitude, latitude]
}
