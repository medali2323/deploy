package com.example.pfe.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.Fournisseur;
import com.example.pfe.services.FournisseurService;

@RestController
@RequestMapping("/api/fournisseurs")
@PreAuthorize("hasRole('ADMIN')")

public class FournisseurController {
    @Autowired
    private FournisseurService fournisseurService;
    @GetMapping
    public List<Fournisseur> getAllFournisseurs() {
        return fournisseurService.getAllFournisseurs();
    }
    @PostMapping
    public Fournisseur createFournisseur(@RequestBody Fournisseur fournisseur) {
        return fournisseurService.saveFournisseur(fournisseur);
    }

    @DeleteMapping("/{id}")
    public void deleteFournisseur(@PathVariable Long id) {
        fournisseurService.deleteFournisseur(id);
    }
    @PutMapping("/{id}")
    public Fournisseur updateFournisseur(@PathVariable Long id, @RequestBody Fournisseur fournisseur) {
        return fournisseurService.updateFournisseur(id, fournisseur);
    }
    
    @GetMapping("/{id}")
    public Fournisseur getFournisseur(@PathVariable Long id) {
        return fournisseurService.getFournisseurById(id);
    }

    // Autres méthodes de contrôleur pour CRUD et autres opérations
}
