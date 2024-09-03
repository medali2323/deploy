package com.example.pfe.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.LigneProduit;
import com.example.pfe.services.LigneProduitService;

import java.util.List;

@RestController
@RequestMapping("/api/LigneProduits")
@PreAuthorize("hasRole('ADMIN')")

public class LigneProduitController {
	  @Autowired
	    private LigneProduitService LigneProduitService;

	    @GetMapping
	    public ResponseEntity<List<LigneProduit>> getAllLigneProduits() {
	        List<LigneProduit> LigneProduits = LigneProduitService.getAllLigneProduits();
	        return new ResponseEntity<>(LigneProduits, HttpStatus.OK);
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<LigneProduit> getLigneProduitById(@PathVariable Long id) {
	    	LigneProduit LigneProduit = LigneProduitService.getLigneProduitById(id);
	        return LigneProduit != null ?
	                new ResponseEntity<>(LigneProduit, HttpStatus.OK) :
	                new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }

	    @PostMapping
	    public ResponseEntity<LigneProduit> addLigneProduit(@RequestBody LigneProduit LigneProduit) {
	        LigneProduit newLigneProduit = LigneProduitService.addLigneProduit(LigneProduit);
	        return new ResponseEntity<>(newLigneProduit, HttpStatus.CREATED);
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<LigneProduit> updateLigneProduit(@PathVariable Long id, @RequestBody LigneProduit LigneProduit) {
	        LigneProduit updatedLigneProduit = LigneProduitService.updateLigneProduit(id, LigneProduit);
	        return updatedLigneProduit != null ?
	                new ResponseEntity<>(updatedLigneProduit, HttpStatus.OK) :
	                new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteLigneProduit(@PathVariable Long id) {
	        LigneProduitService.deleteLigneProduit(id);
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    }
	    @GetMapping("/byBonEntree/{bonEntreeId}")
	    public List<LigneProduit> getLignesDeVenteByBonEntreeId(@PathVariable Long bonEntreeId) {
	        return LigneProduitService.getLignesDeVenteByBonEntreeId(bonEntreeId);
	    }
	}
