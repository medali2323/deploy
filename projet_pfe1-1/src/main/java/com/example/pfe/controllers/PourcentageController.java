package com.example.pfe.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.Pourcentage;
import com.example.pfe.services.PourcentageService;

@RestController
@RequestMapping("/api/pourcentages")
@PreAuthorize("hasRole('ADMIN')")

public class PourcentageController {
    @Autowired
    private PourcentageService PourcentageService;

    @GetMapping
    public ResponseEntity<List<Pourcentage>> getAllPourcentage() {
        List<Pourcentage> Pourcentages = PourcentageService.getAllPourcentage();
        return new ResponseEntity<>(Pourcentages, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pourcentage> getPourcentageById(@PathVariable Long id) {
    	Pourcentage Pourcentage = PourcentageService.getPourcentageById(id);
        return Pourcentage != null ?
                new ResponseEntity<>(Pourcentage, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Pourcentage> addPourcentage(@RequestBody Pourcentage Pourcentage) {
    	System.out.println(Pourcentage);
        Pourcentage newPourcentage = PourcentageService.addPourcentage(Pourcentage);
        return new ResponseEntity<>(newPourcentage, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pourcentage> updatePourcentage(@PathVariable Long id, @RequestBody Pourcentage Pourcentage) {
        Pourcentage updatedPourcentage = PourcentageService.updatePourcentage(id, Pourcentage);
        return updatedPourcentage != null ?
                new ResponseEntity<>(updatedPourcentage, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePourcentage(@PathVariable Long id) {
        PourcentageService.deletePourcentage(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/byCategory/{id}")
    public ResponseEntity<Object> getPourcentageByCategoryId(@PathVariable Long id) {
       Pourcentage pourcentages = PourcentageService.getPourcentageByCategoryId(id);
        return new ResponseEntity<>(pourcentages, HttpStatus.OK);
    }
}
