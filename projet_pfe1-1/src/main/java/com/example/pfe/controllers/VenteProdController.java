package com.example.pfe.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.Vente_prod;
import com.example.pfe.services.VenteProdService;

import java.util.List;

@RestController
@RequestMapping("/api/Vente_prod")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")

public class VenteProdController {
    @Autowired
    private VenteProdService Vente_prodService;

    @GetMapping
    public ResponseEntity<List<Vente_prod>> getAllVente_prods() {
        List<Vente_prod> Vente_prods = Vente_prodService.getAllVenteProds();
        return new ResponseEntity<>(Vente_prods, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vente_prod> getVente_prodById(@PathVariable Long id) {
    	Vente_prod Vente_prod = Vente_prodService.getVenteProdById(id);
        return Vente_prod != null ?
                new ResponseEntity<>(Vente_prod, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Vente_prod> addVente_prod(@RequestBody Vente_prod Vente_prod) {
        Vente_prod newVente_prod = Vente_prodService.addVenteProd(Vente_prod);
        return new ResponseEntity<>(newVente_prod, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vente_prod> updateVente_prod(@PathVariable Long id, @RequestBody Vente_prod Vente_prod) {
        Vente_prod updatedVente_prod = Vente_prodService.updateVenteProd(id, Vente_prod);
        return updatedVente_prod != null ?
                new ResponseEntity<>(updatedVente_prod, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVente_prod(@PathVariable Long id) {
        Vente_prodService.deleteVenteProd(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<List<Vente_prod>> getVentesProdByInstructor(@PathVariable Long instructorId) {
        List<Vente_prod> ventesProd = Vente_prodService.getVentesProdByInstructor(instructorId);
        return ResponseEntity.ok(ventesProd);
    }
}
