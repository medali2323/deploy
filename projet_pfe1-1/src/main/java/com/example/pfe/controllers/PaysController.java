package com.example.pfe.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.Pays;
import com.example.pfe.services.PaysService;

import java.util.List;

@RestController
@RequestMapping("/api/Pays")
@PreAuthorize("hasRole('ADMIN')")

public class PaysController {
    @Autowired
    private PaysService PaysService;

    @GetMapping
    public ResponseEntity<List<Pays>> getAllPays() {
        List<Pays> Payss = PaysService.getAllPays();
        return new ResponseEntity<>(Payss, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pays> getPaysById(@PathVariable Long id) {
    	Pays Pays = PaysService.getPaysById(id);
        return Pays != null ?
                new ResponseEntity<>(Pays, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Pays> addPays(@RequestBody Pays Pays) {
    	System.out.println(Pays);
        Pays newPays = PaysService.addPays(Pays);
        return new ResponseEntity<>(newPays, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pays> updatePays(@PathVariable Long id, @RequestBody Pays Pays) {
        Pays updatedPays = PaysService.updatePays(id, Pays);
        return updatedPays != null ?
                new ResponseEntity<>(updatedPays, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePays(@PathVariable Long id) {
        PaysService.deletePays(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
