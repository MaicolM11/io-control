package com.sanviator.iocontrol.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name="person")
@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Person {

    @Id
    private String identification;
    private String name;
    private String lastname;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String photo;


}
