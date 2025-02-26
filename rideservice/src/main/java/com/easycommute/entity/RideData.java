package com.easycommute.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "rides")
public class RideData {

    @Transient
    public static final String SEQUENCE_NAME = "RIDE_SEQUENCE";

    @Id
    private String rideId;

    // TODO: Add the Database schema


}