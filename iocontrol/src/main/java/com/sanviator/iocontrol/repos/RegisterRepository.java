package com.sanviator.iocontrol.repos;

import com.sanviator.iocontrol.models.Register;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RegisterRepository  extends CrudRepository<Register, UUID> {

     Optional<Register> findTopByCardNumberAndFinalDateTimeIsNullOrderByStartDateTimeDesc(Integer cardNumber);
     List<Register> findByStartDateTimeBetweenOrderByStartDateTimeAsc(LocalDateTime to, LocalDateTime from);

}
