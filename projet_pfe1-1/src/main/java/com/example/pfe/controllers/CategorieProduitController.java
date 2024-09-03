package com.example.pfe.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.Categorie_Produit;
import com.example.pfe.models.Produit;
import com.example.pfe.services.Categorie_ProduitService;

import java.util.List;

@RestController
@RequestMapping("/api/Categorie_Produit")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")

public class CategorieProduitController {
    @Autowired
    private Categorie_ProduitService Categorie_ProduitService;

    @GetMapping
    public ResponseEntity<List<Categorie_Produit>> getAllCategorie_Produits() {
        List<Categorie_Produit> Categorie_Produits = Categorie_ProduitService.getAllCategories();
        return new ResponseEntity<>(Categorie_Produits, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categorie_Produit> getCategorie_ProduitById(@PathVariable Long id) {
    	Categorie_Produit Categorie_Produit = Categorie_ProduitService.getCategoryById(id);
        return Categorie_Produit != null ?
                new ResponseEntity<>(Categorie_Produit, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Categorie_Produit> addCategorie_Produit(@RequestBody Categorie_Produit Categorie_Produit) {
    	Categorie_Produit newCategorie_Produit = Categorie_ProduitService.addCategory(Categorie_Produit);
        return new ResponseEntity<>(newCategorie_Produit, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categorie_Produit> updateCategorie_Produit(@PathVariable Long id, @RequestBody Categorie_Produit Categorie_Produit) {
    	Categorie_Produit updatedCategorie_Produit = Categorie_ProduitService.updateCategory(id, Categorie_Produit);
        return updatedCategorie_Produit != null ?
                new ResponseEntity<>(updatedCategorie_Produit, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategorie_Produit(@PathVariable Long id) {
        Categorie_ProduitService.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/produits/{id}")
    public List<Produit> getProduitsByCategory(@PathVariable Long id) {
        return Categorie_ProduitService.getProduitsByCategory(id);
    }
}
