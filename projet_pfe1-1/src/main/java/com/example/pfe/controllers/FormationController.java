package com.example.pfe.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.Formation;
import com.example.pfe.services.FormationService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/formation")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR') or hasRole('CANDIDAT')")

public class FormationController {
    @Autowired
    private FormationService FormationService;

    @GetMapping
    public ResponseEntity<List<Formation>> getAllFormations() {
        List<Formation> Formations = FormationService.getAllFormations();
        return new ResponseEntity<>(Formations, HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR') or hasRole('CANDIDAT')")
    @GetMapping("/{id}")
    public ResponseEntity<Formation> getFormationById(@PathVariable Long id) {
    	Formation Formation = FormationService.getFormationById(id);
        return Formation != null ?
                new ResponseEntity<>(Formation, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Formation> addFormation(@RequestBody Formation Formation) {
        Formation newFormation = FormationService.addFormation(Formation);
        return new ResponseEntity<>(newFormation, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Formation> updateFormation(@PathVariable Long id, @RequestBody Formation Formation) {
        Formation updatedFormation = FormationService.updateFormation(id, Formation);
        return updatedFormation != null ?
                new ResponseEntity<>(updatedFormation, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFormation(@PathVariable Long id) {
        FormationService.deleteFormation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/approuves")
    public List<Formation> getAllFormationsApprouve() {
        return FormationService.findAllApprouve();
    }

    @GetMapping("/non-approuves")
    public List<Formation> getAllFormationsNonApprouve() {
        return FormationService.findAllNonApprouve();
    }
    @PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")

    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<List<Formation>> getCoursByInstructor(@PathVariable Long instructorId) {
        List<Formation> formation = FormationService.findByInstructorId(instructorId);
        if (formation.isEmpty()) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        }
        return new ResponseEntity<>(formation, HttpStatus.OK);
    }
}
