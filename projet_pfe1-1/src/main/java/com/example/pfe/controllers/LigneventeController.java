package com.example.pfe.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.LigneProduit;
import com.example.pfe.models.Lignevente;
import com.example.pfe.services.LigneventeService;

import java.util.List;

@RestController
@RequestMapping("/api/Lignevente")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")

public class LigneventeController {
    @Autowired
    private LigneventeService LigneventeService;

    @GetMapping
    public ResponseEntity<List<Lignevente>> getAllLigneventes() {
        List<Lignevente> Ligneventes = LigneventeService.getAllLigneventes();
        return new ResponseEntity<>(Ligneventes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lignevente> getLigneventeById(@PathVariable Long id) {
    	Lignevente Lignevente = LigneventeService.getLigneventeById(id);
        return Lignevente != null ?
                new ResponseEntity<>(Lignevente, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Lignevente> addLignevente(@RequestBody Lignevente Lignevente) {
        Lignevente newLignevente = LigneventeService.addLignevente(Lignevente);
        return new ResponseEntity<>(newLignevente, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Lignevente> updateLignevente(@PathVariable Long id, @RequestBody Lignevente Lignevente) {
        Lignevente updatedLignevente = LigneventeService.updateLignevente(id, Lignevente);
        return updatedLignevente != null ?
                new ResponseEntity<>(updatedLignevente, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLignevente(@PathVariable Long id) {
    	System.out.println("id : "+id);
        LigneventeService.deleteLignevente(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/byvebteprod/{vebteprodId}")
    public List<Lignevente> getLignesDeVenteByvebteprodId(@PathVariable Long vebteprodId) {
        return LigneventeService.getLignesDeVenteByventeprodId(vebteprodId);
    }
}
