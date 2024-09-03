package com.example.pfe.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.Type_abonnement;
import com.example.pfe.services.Type_abonnementService;

import java.util.List;

@RestController
@RequestMapping("/api/TypeAbonnement")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")

public class TypeAbonnementController {
    @Autowired
    private Type_abonnementService TypeAbonnementService;

    @GetMapping
    public ResponseEntity<List<Type_abonnement>> getAllTypeAbonnements() {
        List<Type_abonnement> TypeAbonnements = TypeAbonnementService.getAllTypesAbonnement();
        return new ResponseEntity<>(TypeAbonnements, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Type_abonnement> getTypeAbonnementById(@PathVariable Long id) {
    	Type_abonnement TypeAbonnement = TypeAbonnementService.getTypeAbonnementById(id);
        return TypeAbonnement != null ?
                new ResponseEntity<>(TypeAbonnement, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Type_abonnement> addTypeAbonnement(@RequestBody Type_abonnement TypeAbonnement) {
    	Type_abonnement newTypeAbonnement = TypeAbonnementService.addTypeAbonnement(TypeAbonnement);
        return new ResponseEntity<>(newTypeAbonnement, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Type_abonnement> updateTypeAbonnement(@PathVariable Long id, @RequestBody Type_abonnement TypeAbonnement) {
    	Type_abonnement updatedTypeAbonnement = TypeAbonnementService.updateTypeAbonnement(id, TypeAbonnement);
        return updatedTypeAbonnement != null ?
                new ResponseEntity<>(updatedTypeAbonnement, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTypeAbonnement(@PathVariable Long id) {
        TypeAbonnementService.deleteTypeAbonnement(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
