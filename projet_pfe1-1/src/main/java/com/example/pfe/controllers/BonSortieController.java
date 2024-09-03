package com.example.pfe.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.pfe.models.BonSortie;
import com.example.pfe.services.BonSortieService;

@RestController
@RequestMapping("/api/bonsorties")
@PreAuthorize("hasRole('ADMIN')")
public class BonSortieController {
	 @Autowired
	    private BonSortieService BonSortieService;

	    @GetMapping
	    public ResponseEntity<List<BonSortie>> getAllBonSorties() {
	        List<BonSortie> BonSorties = BonSortieService.getAllBonSortie();
	        return new ResponseEntity<>(BonSorties, HttpStatus.OK);
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<BonSortie> getBonSortieById(@PathVariable Long id) {
	        BonSortie BonSortie = BonSortieService.getBonSortieById(id);
	        return BonSortie != null ?
	                new ResponseEntity<>(BonSortie, HttpStatus.OK) :
	                new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }

	    @PostMapping
	    public ResponseEntity<BonSortie> addBonSortie(@RequestBody BonSortie BonSortie) {
	        BonSortie newBonSortie = BonSortieService.addBonSortie(BonSortie);
	        return new ResponseEntity<>(newBonSortie, HttpStatus.CREATED);
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<BonSortie> updateBonSortie(@PathVariable Long id, @RequestBody BonSortie BonSortie) {
	        BonSortie updatedBonSortie = BonSortieService.updateBonSortie(id, BonSortie);
	        return updatedBonSortie != null ?
	                new ResponseEntity<>(updatedBonSortie, HttpStatus.OK) :
	                new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteBonSortie(@PathVariable Long id) {
	        BonSortieService.deleteBonSortie(id);
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    }
	    @GetMapping("/betweenDates")
	    public List<BonSortie> getBonSortiesBetweenDates(@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
	                                                     @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
	        return BonSortieService.getBonSortiesBetweenDates(startDate, endDate);
	    }
	}
