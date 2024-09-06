package com.example.pfe.controllers;

 import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.FormationEnLigne;
import com.example.pfe.services.FormationEnLigneService;

import java.util.List;

@RestController
@RequestMapping("/api/FormationEnLigne")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR') or hasRole('CANDIDAT')")

public class FormationEnLigneController {
    @Autowired
    private FormationEnLigneService FormationEnLigneService;
    
    @GetMapping
    public ResponseEntity<List<FormationEnLigne>> getAllFormationEnLignes() {
        List<FormationEnLigne> FormationEnLignes = FormationEnLigneService.getAllFormationEnLigne();
        return new ResponseEntity<>(FormationEnLignes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FormationEnLigne> getFormationEnLigneById(@PathVariable Long id) {
    	FormationEnLigne FormationEnLigne = FormationEnLigneService.getFormationEnLigneById(id);
        return FormationEnLigne != null ?
                new ResponseEntity<>(FormationEnLigne, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<FormationEnLigne> addFormationEnLigne(@RequestBody FormationEnLigne FormationEnLigne) {
        FormationEnLigne newFormationEnLigne = FormationEnLigneService.addFormationEnLigne(FormationEnLigne);
        return new ResponseEntity<>(newFormationEnLigne, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FormationEnLigne> updateFormationEnLigne(@PathVariable Long id, @RequestBody FormationEnLigne FormationEnLigne) {
        FormationEnLigne updatedFormationEnLigne = FormationEnLigneService.updateFormationEnLigne(id, FormationEnLigne);
        return updatedFormationEnLigne != null ?
                new ResponseEntity<>(updatedFormationEnLigne, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFormationEnLigne(@PathVariable Long id) {
        FormationEnLigneService.deleteFormations(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
   
}
