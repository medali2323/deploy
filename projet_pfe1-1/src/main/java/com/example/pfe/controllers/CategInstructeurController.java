package com.example.pfe.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.Categ_Instructeur;
import com.example.pfe.services.Categ_InstructeurService;

import java.util.List;

@RestController
@RequestMapping("/api/categ_Instructeur")
@PreAuthorize("hasRole('ADMIN')")

public class CategInstructeurController {
    @Autowired
    private Categ_InstructeurService categ_InstructeurService;

    @GetMapping
    public ResponseEntity<List<Categ_Instructeur>> getAllcateg_Instructeurs() {
        List<Categ_Instructeur> categ_Instructeurs = categ_InstructeurService.getAllCategories();
        return new ResponseEntity<>(categ_Instructeurs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categ_Instructeur> getcateg_InstructeurById(@PathVariable Long id) {
    	Categ_Instructeur categ_Instructeur = categ_InstructeurService.getCategoryById(id);
        return categ_Instructeur != null ?
                new ResponseEntity<>(categ_Instructeur, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Categ_Instructeur> addcateg_Instructeur(@RequestBody Categ_Instructeur categ_Instructeur) {
        Categ_Instructeur newcateg_Instructeur = categ_InstructeurService.addCategory(categ_Instructeur);
        return new ResponseEntity<>(newcateg_Instructeur, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categ_Instructeur> updatecateg_Instructeur(@PathVariable Long id, @RequestBody Categ_Instructeur categ_Instructeur) {
        Categ_Instructeur updatedcateg_Instructeur = categ_InstructeurService.updateCategory(id, categ_Instructeur);
        return updatedcateg_Instructeur != null ?
                new ResponseEntity<>(updatedcateg_Instructeur, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletecateg_Instructeur(@PathVariable Long id) {
        categ_InstructeurService.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
