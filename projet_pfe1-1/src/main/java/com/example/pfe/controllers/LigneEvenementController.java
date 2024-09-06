package com.example.pfe.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pfe.models.Evenement;
import com.example.pfe.models.Instructor;
import com.example.pfe.models.LigneEvenement;
import com.example.pfe.services.LigneEvenementService;

@RestController
@RequestMapping("/api/LigneEvenement")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")

public class LigneEvenementController {
    @Autowired
    private LigneEvenementService LigneEvenementService;

    @GetMapping
    public ResponseEntity<List<LigneEvenement>> getAllLigneEvenements() {
        List<LigneEvenement> LigneEvenements = LigneEvenementService.getAllLigneEvenements();
        return new ResponseEntity<>(LigneEvenements, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LigneEvenement> getLigneEvenementById(@PathVariable Long id) {
    	LigneEvenement LigneEvenement = LigneEvenementService.getLigneEvenementById(id);
        return LigneEvenement != null ?
                new ResponseEntity<>(LigneEvenement, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<LigneEvenement> addLigneEvenement(@RequestBody LigneEvenement LigneEvenement) {
        LigneEvenement newLigneEvenement = LigneEvenementService.addLigneEvenement(LigneEvenement);
        return new ResponseEntity<>(newLigneEvenement, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LigneEvenement> updateLigneEvenement(@PathVariable Long id, @RequestBody LigneEvenement LigneEvenement) {
        LigneEvenement updatedLigneEvenement = LigneEvenementService.updateLigneEvenement(id, LigneEvenement);
        return updatedLigneEvenement != null ?
                new ResponseEntity<>(updatedLigneEvenement, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLigneEvenement(@PathVariable Long id) {
    	System.out.println("id : "+id);
    	LigneEvenementService.deleteLigneEvenement(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/instructors/{EvenementId}")
    public ResponseEntity<List<Instructor>> getInstructorsByEvenementId(@PathVariable Long EvenementId) {
        List<Instructor> instructors = LigneEvenementService.getInstructorsByEvenementId(EvenementId);
        return ResponseEntity.ok(instructors);
    }
    @GetMapping("/instructorsnot/{EvenementId}")
    public ResponseEntity<List<Instructor>> getInstructorsnotByEvenementId(@PathVariable Long EvenementId) {
        List<Instructor> instructors = LigneEvenementService.getInstructorsNotByEvenementId(EvenementId);
        return ResponseEntity.ok(instructors);
    }
    @GetMapping("/evenements/{InstructorId}")
    public ResponseEntity<List<Evenement>> getEvenementByInstructorsId(@PathVariable Long InstructorId) {
        List<Evenement> instructors = LigneEvenementService.findDistinctEvenementByInstructors(InstructorId);
        return ResponseEntity.ok(instructors);
    }
}


