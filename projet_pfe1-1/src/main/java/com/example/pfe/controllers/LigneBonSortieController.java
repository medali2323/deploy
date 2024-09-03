package com.example.pfe.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pfe.models.LigneBonSortie;
import com.example.pfe.services.LigneBonSortieService;

@RestController
@RequestMapping("/api/ligneBonSorties")
@PreAuthorize("hasRole('ADMIN')")

public class LigneBonSortieController {
	  @Autowired
	    private LigneBonSortieService LigneBonSortieService;

	    @GetMapping
	    public ResponseEntity<List<LigneBonSortie>> getAllLigneBonSorties() {
	        List<LigneBonSortie> LigneBonSorties = LigneBonSortieService.getAllLigneBonSorties();
	        return new ResponseEntity<>(LigneBonSorties, HttpStatus.OK);
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<LigneBonSortie> getLigneBonSortieById(@PathVariable Long id) {
	    	LigneBonSortie LigneBonSortie = LigneBonSortieService.getLigneBonSortieById(id);
	        return LigneBonSortie != null ?
	                new ResponseEntity<>(LigneBonSortie, HttpStatus.OK) :
	                new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }

	    @PostMapping
	    public ResponseEntity<LigneBonSortie> addLigneBonSortie(@RequestBody LigneBonSortie LigneBonSortie) {
	        LigneBonSortie newLigneBonSortie = LigneBonSortieService.addLigneBonSortie(LigneBonSortie);
	        return new ResponseEntity<>(newLigneBonSortie, HttpStatus.CREATED);
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<LigneBonSortie> updateLigneBonSortie(@PathVariable Long id, @RequestBody LigneBonSortie LigneBonSortie) {
	        LigneBonSortie updatedLigneBonSortie = LigneBonSortieService.updateLigneBonSortie(id, LigneBonSortie);
	        return updatedLigneBonSortie != null ?
	                new ResponseEntity<>(updatedLigneBonSortie, HttpStatus.OK) :
	                new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteLigneBonSortie(@PathVariable Long id) {
	        LigneBonSortieService.deleteLigneBonSortie(id);
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    }
	    @GetMapping("/byBonSortie/{bonSortieId}")
	    public List<LigneBonSortie> getLignesDeVenteByBonSortieId(@PathVariable Long bonSortieId) {
	        return LigneBonSortieService.getLignesDeVenteByBonsortieId(bonSortieId);
	    }
	}
