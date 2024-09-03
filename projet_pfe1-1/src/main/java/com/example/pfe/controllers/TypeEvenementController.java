package com.example.pfe.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.Type_evenement;
import com.example.pfe.services.Type_evenementService;

import java.util.List;

@RestController
@RequestMapping("/api/Type_evenement")
@PreAuthorize("hasRole('ADMIN')")

public class TypeEvenementController {
    @Autowired
    private Type_evenementService Type_evenementService;

    @GetMapping
    public ResponseEntity<List<Type_evenement>> getAllType_evenements() {
        List<Type_evenement> Type_evenements = Type_evenementService.getAllTypesEvenement();
        return new ResponseEntity<>(Type_evenements, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Type_evenement> getType_evenementById(@PathVariable Long id) {
    	Type_evenement Type_evenement = Type_evenementService.getTypeEvenementById(id);
        return Type_evenement != null ?
                new ResponseEntity<>(Type_evenement, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Type_evenement> addType_evenement(@RequestBody Type_evenement Type_evenement) {
    	Type_evenement newType_evenement = Type_evenementService.addTypeEvenement(Type_evenement);
        return new ResponseEntity<>(newType_evenement, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Type_evenement> updateType_evenement(@PathVariable Long id, @RequestBody Type_evenement Type_evenement) {
    	Type_evenement updatedType_evenement = Type_evenementService.updateTypeEvenement(id, Type_evenement);
        return updatedType_evenement != null ?
                new ResponseEntity<>(updatedType_evenement, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteType_evenement(@PathVariable Long id) {
        Type_evenementService.deleteTypeEvenement(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
