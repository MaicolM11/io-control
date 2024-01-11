package com.sanviator.iocontrol.services;

import com.sanviator.iocontrol.models.Person;
import org.springframework.stereotype.Service;

@Service
public class InterpreterTextService {

    public Person interpretedText(String text) {
        var person = new Person();
        person.setName("Carlos Felipe");
        person.setLastname("Cuesta Rios");
        person.setIdentification("1002395162");
        return person;
    }

}
