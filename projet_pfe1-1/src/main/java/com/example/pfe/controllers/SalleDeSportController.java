package com.example.pfe.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.SalleDeSport;
import com.example.pfe.services.SalleDeSportService;

import java.util.List;

@RestController
@RequestMapping("/api/SalleDeSport")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")

public class SalleDeSportController {
    @Autowired
    private SalleDeSportService SalleDeSportService;

    @GetMapping
    public ResponseEntity<List<SalleDeSport>> getAllSalleDeSports() {
        List<SalleDeSport> SalleDeSports = SalleDeSportService.getAllSallesDeSport();
        return new ResponseEntity<>(SalleDeSports, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SalleDeSport> getSalleDeSportById(@PathVariable Long id) {
    	SalleDeSport SalleDeSport = SalleDeSportService.getSalleDeSportById(id);
        return SalleDeSport != null ?
                new ResponseEntity<>(SalleDeSport, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<SalleDeSport> addSalleDeSport(@RequestBody SalleDeSport SalleDeSport) {
        SalleDeSport newSalleDeSport = SalleDeSportService.addSalleDeSport(SalleDeSport);
        return new ResponseEntity<>(newSalleDeSport, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SalleDeSport> updateSalleDeSport(@PathVariable Long id, @RequestBody SalleDeSport SalleDeSport) {
        SalleDeSport updatedSalleDeSport = SalleDeSportService.updateSalleDeSport(id, SalleDeSport);
        return updatedSalleDeSport != null ?
                new ResponseEntity<>(updatedSalleDeSport, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSalleDeSport(@PathVariable Long id) {
        SalleDeSportService.deleteSalleDeSport(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
