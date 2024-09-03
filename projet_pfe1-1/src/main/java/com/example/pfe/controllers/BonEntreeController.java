package com.example.pfe.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.BonEntree;
import com.example.pfe.models.BonEntree;
import com.example.pfe.services.BonEntreeService;

import java.util.Date;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;

@RestController
@RequestMapping("/api/bonentrees")
@PreAuthorize("hasRole('ADMIN')")

public class BonEntreeController {
	 @Autowired
	    private BonEntreeService bonEntreeService;

	    @GetMapping
	    public ResponseEntity<List<BonEntree>> getAllBonEntrees() {
	        List<BonEntree> BonEntrees = bonEntreeService.getAllBonEntree();
	        return new ResponseEntity<>(BonEntrees, HttpStatus.OK);
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<BonEntree> getBonEntreeById(@PathVariable Long id) {
	        BonEntree BonEntree = bonEntreeService.getBonEntreeById(id);
	        return BonEntree != null ?
	                new ResponseEntity<>(BonEntree, HttpStatus.OK) :
	                new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }

	    @PostMapping
	    public ResponseEntity<BonEntree> addBonEntree(@RequestBody BonEntree BonEntree) {
	        BonEntree newBonEntree = bonEntreeService.addBonEntree(BonEntree);
	        return new ResponseEntity<>(newBonEntree, HttpStatus.CREATED);
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<BonEntree> updateBonEntree(@PathVariable Long id, @RequestBody BonEntree BonEntree) {
	        BonEntree updatedBonEntree = bonEntreeService.updateBonEntree(id, BonEntree);
	        return updatedBonEntree != null ?
	                new ResponseEntity<>(updatedBonEntree, HttpStatus.OK) :
	                new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteBonEntree(@PathVariable Long id) {
	        bonEntreeService.deleteBonEntree(id);
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    }
	    @GetMapping("/betweenDates")
	    public List<BonEntree> getBonEntreesBetweenDates(@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
	                                                     @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
	        return bonEntreeService.getBonEntreesBetweenDates(startDate, endDate);
	    }
	}
