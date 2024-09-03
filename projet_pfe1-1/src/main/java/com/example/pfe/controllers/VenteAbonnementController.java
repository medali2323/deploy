package com.example.pfe.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.Vente_abonnement;
import com.example.pfe.services.VenteAbonnementService;

import java.util.List;

@RestController
@RequestMapping("/api/Vente_abonnement")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")

public class VenteAbonnementController {
    @Autowired
    private VenteAbonnementService Vente_abonnementService;

    @GetMapping
    public ResponseEntity<List<Vente_abonnement>> getAllVente_abonnements() {
        List<Vente_abonnement> Vente_abonnements = Vente_abonnementService.getAllVenteAbonnements();
        return new ResponseEntity<>(Vente_abonnements, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vente_abonnement> getVente_abonnementById(@PathVariable Long id) {
    	Vente_abonnement Vente_abonnement = Vente_abonnementService.getVenteAbonnementById(id);
        return Vente_abonnement != null ?
                new ResponseEntity<>(Vente_abonnement, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Vente_abonnement> addVente_abonnement(@RequestBody Vente_abonnement Vente_abonnement) {
        Vente_abonnement newVente_abonnement = Vente_abonnementService.addVenteAbonnement(Vente_abonnement);
        return new ResponseEntity<>(newVente_abonnement, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vente_abonnement> updateVente_abonnement(@PathVariable Long id, @RequestBody Vente_abonnement Vente_abonnement) {
        Vente_abonnement updatedVente_abonnement = Vente_abonnementService.updateVenteAbonnement(id, Vente_abonnement);
        return updatedVente_abonnement != null ?
                new ResponseEntity<>(updatedVente_abonnement, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVente_abonnement(@PathVariable Long id) {
        Vente_abonnementService.deleteVenteAbonnement(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<List<Vente_abonnement>> getVentesAbonnementByInstructor(@PathVariable Long instructorId) {
        List<Vente_abonnement> ventesAbonnement = Vente_abonnementService.getVentesAbonnementByInstructor(instructorId);
        return ResponseEntity.ok(ventesAbonnement);
    }}
