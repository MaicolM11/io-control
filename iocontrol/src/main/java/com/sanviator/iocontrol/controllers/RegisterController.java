package com.sanviator.iocontrol.controllers;

import com.sanviator.iocontrol.models.Person;
import com.sanviator.iocontrol.models.Register;
import com.sanviator.iocontrol.repos.PersonRepository;
import com.sanviator.iocontrol.repos.RegisterRepository;
import com.sanviator.iocontrol.services.InterpreterTextService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "Content-Type")
public class RegisterController {

    private final InterpreterTextService interpreterTextService;
    private final PersonRepository personRepository;
    private final RegisterRepository registerRepository;

    private static final String CSV_HEADERS = "IDENTIFICACION;NOMBRES;APELLIDOS;FECHA DE INGRESO; FECHA DE SALIDA\n";


    // metodo interpretar trama txt scanner, busca bd si existe, set photo, retorna el person
    @PostMapping("/interpreted")
    public Person interpretedScannerText(@RequestBody String txt) {
        var personInterpreted = interpreterTextService.interpretedText(txt);
        var personDB = personRepository.findById(personInterpreted.getIdentification());
        personDB.ifPresent(person -> personInterpreted.setPhoto(person.getPhoto()));
        return personInterpreted;
    }

    // guardar hora entrada
    @PostMapping("/register")
    public void registerStartDate(@RequestBody Person person, @RequestParam("numberCard") Integer cardNumber) {
        var personDB = personRepository.findById(person.getIdentification())
                .orElseGet(() -> personRepository.save(person));

        var registerDb = Register.builder()
                .startDateTime(LocalDateTime.now())
                .cardNumber(cardNumber)
                .person(personDB).build();

        registerRepository.save(registerDb);
    }

    // guardar hora de salida
    @PostMapping("/registerFinalDate")
    public ResponseEntity<Register> registerFinalDate(@RequestParam("numberCard") Integer cardNumber) {
        var registerDb = registerRepository.findTopByCardNumberAndFinalDateTimeIsNullOrderByStartDateTimeDesc(cardNumber);
        if(registerDb.isPresent()) {
            var newRegister = registerDb.get();
            newRegister.setFinalDateTime(LocalDateTime.now());
            registerRepository.save(newRegister);
            return  ResponseEntity.ok()
                    .body(newRegister);
        }
        return ResponseEntity.notFound().build();
    }

    // reportes 2018-05-05
    @GetMapping("/download")
    public ResponseEntity<String> downloadReport(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) {
        var startDateTime = LocalDate.parse(startDate).atStartOfDay();
        var endDateTime = LocalDate.parse(endDate).atTime(LocalTime.MAX);

        var registers = registerRepository.findByStartDateTimeBetween(startDateTime, endDateTime);

        StringBuilder csv = new StringBuilder(CSV_HEADERS);

        registers.forEach(register -> csv.append(register.toCsv()));
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + startDate + " " + endDate + ".csv");

        return ResponseEntity.ok()
                .headers(headers)
                .body(csv.toString());
    }

    @GetMapping("/test")
    public String test() {
        return "works!";
    }


}
