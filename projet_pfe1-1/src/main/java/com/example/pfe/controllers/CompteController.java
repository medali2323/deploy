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

import com.example.pfe.models.Compte;
import com.example.pfe.services.CompteService;

@RestController
@RequestMapping("/api/Compte")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")

public class CompteController {
    @Autowired
    private CompteService CompteService;

    @GetMapping
    public ResponseEntity<List<Compte>> getAllComptes() {
        List<Compte> Comptes = CompteService.getAllComptes();
        return new ResponseEntity<>(Comptes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Compte> getCompteById(@PathVariable Long id) {
    	Compte Compte = CompteService.getCompteById(id);
        return Compte != null ?
                new ResponseEntity<>(Compte, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Compte> addCompte(@RequestBody Compte Compte) {
        Compte newCompte = CompteService.addCompte(Compte);
        return new ResponseEntity<>(newCompte, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Compte> updateCompte(@PathVariable Long id, @RequestBody Compte Compte) {
        Compte updatedCompte = CompteService.updateCompte(id, Compte);
        return updatedCompte != null ?
                new ResponseEntity<>(updatedCompte, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompte(@PathVariable Long id) {
        CompteService.deleteCompte(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/byInstructor/{id}")
    public ResponseEntity<Object> getCompteByCategoryId(@PathVariable Long id) {
       Compte Comptes = CompteService.getCompteByInstructorId(id);
        return new ResponseEntity<>(Comptes, HttpStatus.OK);
    }
}
