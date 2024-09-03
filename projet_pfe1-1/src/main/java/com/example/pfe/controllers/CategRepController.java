package com.example.pfe.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.Categ_rep;
import com.example.pfe.services.Categ_repService;

import java.util.List;

@RestController
@RequestMapping("/api/categorie_representant")
@PreAuthorize("hasRole('ADMIN')")

public class CategRepController {
    @Autowired
    private Categ_repService Categ_repService;

    @GetMapping
    public ResponseEntity<List<Categ_rep>> getAllCateg_reps() {
        List<Categ_rep> Categ_reps = Categ_repService.getAllCategories();
        return new ResponseEntity<>(Categ_reps, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categ_rep> getCateg_repById(@PathVariable Long id) {
    	Categ_rep Categ_rep = Categ_repService.getCategoryById(id);
        return Categ_rep != null ?
                new ResponseEntity<>(Categ_rep, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Categ_rep> addCateg_rep(@RequestBody Categ_rep Categ_rep) {
        Categ_rep newCateg_rep = Categ_repService.addCategory(Categ_rep);
        return new ResponseEntity<>(newCateg_rep, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categ_rep> updateCateg_rep(@PathVariable Long id, @RequestBody Categ_rep Categ_rep) {
        Categ_rep updatedCateg_rep = Categ_repService.updateCategory(id, Categ_rep);
        return updatedCateg_rep != null ?
                new ResponseEntity<>(updatedCateg_rep, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCateg_rep(@PathVariable Long id) {
        Categ_repService.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
