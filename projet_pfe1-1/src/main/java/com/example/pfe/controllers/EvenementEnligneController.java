package com.example.pfe.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.EvenementEnLigne;
import com.example.pfe.models.EvenementEnLigne;
import com.example.pfe.services.EvenementEnLigneService;
import com.example.pfe.services.EvenementEnLigneService;

import java.util.List;

@RestController
@RequestMapping("/api/EvenementEnLigne")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")

public class EvenementEnligneController {
   
    @Autowired
    private EvenementEnLigneService EvenementEnLigneService ;
    @GetMapping
    public ResponseEntity<List<EvenementEnLigne>> getAllEvenementEnLignes() {
        List<EvenementEnLigne> EvenementEnLignes = EvenementEnLigneService.getAllEvenementEnLignes();
        return new ResponseEntity<>(EvenementEnLignes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EvenementEnLigne> getEvenementEnLigneById(@PathVariable Long id) {
    	EvenementEnLigne EvenementEnLigne = EvenementEnLigneService.getEvenementEnLigneById(id);
        return EvenementEnLigne != null ?
                new ResponseEntity<>(EvenementEnLigne, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<EvenementEnLigne> addEvenementEnLigne(@RequestBody EvenementEnLigne EvenementEnLigne) {
        EvenementEnLigne newEvenementEnLigne = EvenementEnLigneService.addEvenementEnLigne(EvenementEnLigne);
        return new ResponseEntity<>(newEvenementEnLigne, HttpStatus.CREATED);
    }
 

    @PutMapping("/{id}")
    public ResponseEntity<EvenementEnLigne> updateEvenementEnLigne(@PathVariable Long id, @RequestBody EvenementEnLigne EvenementEnLigne) {
        EvenementEnLigne updatedEvenementEnLigne = EvenementEnLigneService.updateEvenementEnLigne(id, EvenementEnLigne);
        return updatedEvenementEnLigne != null ?
                new ResponseEntity<>(updatedEvenementEnLigne, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvenementEnLigne(@PathVariable Long id) {
        EvenementEnLigneService.deleteEvenementEnLigne(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<List<EvenementEnLigne>> getEvenementEnLignesByInstructorId(@PathVariable Long instructorId) {
        List<EvenementEnLigne> EvenementEnLignes = EvenementEnLigneService.getEvenementEnLignesByInstructorId(instructorId);
        return ResponseEntity.ok(EvenementEnLignes);
    }
}
