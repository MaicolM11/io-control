package com.sanviator.iocontrol.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;
import java.util.StringJoiner;
import java.util.UUID;

@Entity
@Table(name="register")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Register {

    private final static DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private LocalDateTime startDateTime;
    private LocalDateTime finalDateTime;
    private Integer cardNumber;

    @ManyToOne(optional = false, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Person person;


    public String toCsv() {

        StringJoiner stringJoiner = new StringJoiner(";", "", "\n");
        stringJoiner.add(person.getIdentification());
        stringJoiner.add(person.getName());
        stringJoiner.add(person.getLastname());
        stringJoiner.add(startDateTime.format(FORMATTER));
        stringJoiner.add(Objects.nonNull(finalDateTime) ? finalDateTime.format(FORMATTER) : "-");

        /*if(Objects.nonNull(finalDateTime)) {
            stringJoiner.add(finalDateTime.toString());
        } else {
            stringJoiner.add("-");
        }*/
        return stringJoiner.toString();
    }

}
