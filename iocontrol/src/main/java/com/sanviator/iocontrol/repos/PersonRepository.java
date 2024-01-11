package com.sanviator.iocontrol.repos;

import com.sanviator.iocontrol.models.Person;
import org.springframework.data.repository.CrudRepository;

public interface PersonRepository extends CrudRepository<Person, String> {
}
