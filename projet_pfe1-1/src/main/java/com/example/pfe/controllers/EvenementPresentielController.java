package com.example.pfe.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.EvenementPresentiel;
import com.example.pfe.models.EvenementEnLigne;
import com.example.pfe.services.EvenementPresentielService;
import com.example.pfe.services.EvenementEnLigneService;

import java.util.List;

@RestController
@RequestMapping("/api/EvenementPresentiel")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")

public class EvenementPresentielController {
    @Autowired
    private EvenementPresentielService EvenementPresentielService;
    @Autowired
    private EvenementEnLigneService evenementEnLigneService ;
    @GetMapping
    public ResponseEntity<List<EvenementPresentiel>> getAllEvenementPresentiels() {
        List<EvenementPresentiel> EvenementPresentiels = EvenementPresentielService.getAllEvenementPresentiels();
        return new ResponseEntity<>(EvenementPresentiels, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EvenementPresentiel> getEvenementPresentielById(@PathVariable Long id) {
    	EvenementPresentiel EvenementPresentiel = EvenementPresentielService.getEvenementPresentielById(id);
        return EvenementPresentiel != null ?
                new ResponseEntity<>(EvenementPresentiel, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<EvenementPresentiel> addEvenementPresentiel(@RequestBody EvenementPresentiel EvenementPresentiel) {
        EvenementPresentiel newEvenementPresentiel = EvenementPresentielService.addEvenementPresentiel(EvenementPresentiel);
        return new ResponseEntity<>(newEvenementPresentiel, HttpStatus.CREATED);
    }
 

    @PutMapping("/{id}")
    public ResponseEntity<EvenementPresentiel> updateEvenementPresentiel(@PathVariable Long id, @RequestBody EvenementPresentiel EvenementPresentiel) {
        EvenementPresentiel updatedEvenementPresentiel = EvenementPresentielService.updateEvenementPresentiel(id, EvenementPresentiel);
        return updatedEvenementPresentiel != null ?
                new ResponseEntity<>(updatedEvenementPresentiel, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvenementPresentiel(@PathVariable Long id) {
        EvenementPresentielService.deleteEvenementPresentiel(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<List<EvenementPresentiel>> getEvenementPresentielsByInstructorId(@PathVariable Long instructorId) {
        List<EvenementPresentiel> EvenementPresentiels = EvenementPresentielService.getEvenementPresentielsByInstructorId(instructorId);
        return ResponseEntity.ok(EvenementPresentiels);
    }
}
