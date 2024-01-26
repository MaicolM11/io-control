package com.sanviator.iocontrol.services;

import com.sanviator.iocontrol.models.Person;
import org.springframework.stereotype.Service;

@Service
public class InterpreterTextService {

    public Person interpretedText(String text) {
        try {
            String[] metadata = text.split("\\t");
            var person = new Person();
            person.setIdentification(metadata[0]);
            person.setName(metadata[1] + " " + metadata[2]);
            person.setLastname(metadata[3] + " " + metadata[4]);
            return person;
        } catch (ArrayIndexOutOfBoundsException ex) {
            return new Person();
        }
    }

}
