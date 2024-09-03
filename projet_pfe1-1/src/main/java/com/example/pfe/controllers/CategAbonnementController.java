package com.example.pfe.controllers;

import com.example.pfe.models.Categ_abonnement;
import com.example.pfe.services.Categ_abonnementService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categ_abonnement")
@PreAuthorize("hasRole('ADMIN')")

public class CategAbonnementController {
    @Autowired
    private Categ_abonnementService categAbonnementService;

    @GetMapping
    public ResponseEntity<List<Categ_abonnement>> getAllCategAbonnements() {
        List<Categ_abonnement> categAbonnements = categAbonnementService.getAllCategories();
        return new ResponseEntity<>(categAbonnements, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categ_abonnement> getCategAbonnementById(@PathVariable Long id) {
        Categ_abonnement categAbonnement = categAbonnementService.getCategoryById(id);
        return categAbonnement != null ?
                new ResponseEntity<>(categAbonnement, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Categ_abonnement> addCategAbonnement(@RequestBody Categ_abonnement categAbonnement) {
        Categ_abonnement newCategAbonnement = categAbonnementService.addCategory(categAbonnement);
        return new ResponseEntity<>(newCategAbonnement, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categ_abonnement> updateCategAbonnement(@PathVariable Long id, @RequestBody Categ_abonnement categAbonnement) {
        Categ_abonnement updatedCategAbonnement = categAbonnementService.updateCategory(id, categAbonnement);
        return updatedCategAbonnement != null ?
                new ResponseEntity<>(updatedCategAbonnement, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategAbonnement(@PathVariable Long id) {
        categAbonnementService.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
