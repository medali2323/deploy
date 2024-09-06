package com.example.pfe.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.Categ_formation;
import com.example.pfe.services.Categ_formationService;

import java.util.List;

@RestController
@RequestMapping("/api/categFormation")
@PreAuthorize("hasRole('ADMIN')")

public class CategFormationController {
    @Autowired
    private Categ_formationService categFormationService;
    
    
    @PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")
    @GetMapping
    public ResponseEntity<List<Categ_formation>> getAllCategFormations() {
        List<Categ_formation> categFormations = categFormationService.getAllCategories();
        return new ResponseEntity<>(categFormations, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categ_formation> getCategFormationById(@PathVariable Long id) {
        Categ_formation categFormation = categFormationService.getCategoryById(id);
        return categFormation != null ?
                new ResponseEntity<>(categFormation, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Categ_formation> addCategFormation(@RequestBody Categ_formation categFormation) {
        Categ_formation newCategFormation = categFormationService.addCategory(categFormation);
        return new ResponseEntity<>(newCategFormation, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categ_formation> updateCategFormation(@PathVariable Long id, @RequestBody Categ_formation categFormation) {
        Categ_formation updatedCategFormation = categFormationService.updateCategory(id, categFormation);
        return updatedCategFormation != null ?
                new ResponseEntity<>(updatedCategFormation, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategFormation(@PathVariable Long id) {
        categFormationService.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
