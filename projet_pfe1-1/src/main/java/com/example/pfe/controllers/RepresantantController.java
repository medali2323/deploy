package com.example.pfe.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.Represantant;
import com.example.pfe.services.RepresantantService;

import java.util.List;

@RestController
@RequestMapping("/api/Represantant")
@PreAuthorize("hasRole('ADMIN')")

public class RepresantantController {
    @Autowired
    private RepresantantService RepresantantService;

    @GetMapping
    public ResponseEntity<List<Represantant>> getAllRepresantants() {
        List<Represantant> Represantants = RepresantantService.getAllRepresantants();
        return new ResponseEntity<>(Represantants, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Represantant> getRepresantantById(@PathVariable Long id) {
    	Represantant Represantant = RepresantantService.getRepresantantById(id);
        return Represantant != null ?
                new ResponseEntity<>(Represantant, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Represantant> addRepresantant(@RequestBody Represantant Represantant) {
        Represantant newRepresantant = RepresantantService.addRepresantant(Represantant);
        return new ResponseEntity<>(newRepresantant, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Represantant> updateRepresantant(@PathVariable Long id, @RequestBody Represantant Represantant) {
        Represantant updatedRepresantant = RepresantantService.updateRepresantant(id, Represantant);
        return updatedRepresantant != null ?
                new ResponseEntity<>(updatedRepresantant, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRepresantant(@PathVariable Long id) {
        RepresantantService.deleteRepresantant(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
