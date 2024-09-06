package com.example.pfe.controllers;

 import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.FormationPresentiel;
import com.example.pfe.services.FormationPresentielService;

import java.util.List;

@RestController
@RequestMapping("/api/FormationPresentiel")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR') or hasRole('CANDIDAT')")

public class FormationPresentielController {
    @Autowired
    private FormationPresentielService FormationPresentielService;
    
    @GetMapping
    public ResponseEntity<List<FormationPresentiel>> getAllFormationPresentiels() {
        List<FormationPresentiel> FormationPresentiels = FormationPresentielService.getAllFormationPresentiel();
        return new ResponseEntity<>(FormationPresentiels, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FormationPresentiel> getFormationPresentielById(@PathVariable Long id) {
    	FormationPresentiel FormationPresentiel = FormationPresentielService.getFormationPresentielById(id);
        return FormationPresentiel != null ?
                new ResponseEntity<>(FormationPresentiel, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<FormationPresentiel> addFormationPresentiel(@RequestBody FormationPresentiel FormationPresentiel) {
        FormationPresentiel newFormationPresentiel = FormationPresentielService.addFormationPresentiel(FormationPresentiel);
        return new ResponseEntity<>(newFormationPresentiel, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FormationPresentiel> updateFormationPresentiel(@PathVariable Long id, @RequestBody FormationPresentiel FormationPresentiel) {
        FormationPresentiel updatedFormationPresentiel = FormationPresentielService.updateFormationPresentiel(id, FormationPresentiel);
        return updatedFormationPresentiel != null ?
                new ResponseEntity<>(updatedFormationPresentiel, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFormationPresentiel(@PathVariable Long id) {
        FormationPresentielService.deleteFormations(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
   
}
