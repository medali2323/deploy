package com.example.pfe.controllers;

import com.example.pfe.models.Categorie_cours;
import com.example.pfe.services.Categorie_coursService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/Categorie_cours")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")
public class Categorie_coursController {
    @Autowired
    private Categorie_coursService categorie_coursService;

    @GetMapping()
    public List<Categorie_cours> getAllCategories() {
        return categorie_coursService.getAllCategories();
    }

    @GetMapping("/{id}")
    public Categorie_cours getCategoryById(@PathVariable Long id) {
        return categorie_coursService.getCategoryById(id);
    }

    @PostMapping()
    public Categorie_cours addCategory(@RequestBody Categorie_cours category) {
        return categorie_coursService.addCategory(category);
    }

    @PutMapping("/{id}")
    public Categorie_cours updateCategory(@PathVariable Long id, @RequestBody Categorie_cours category) {
        return categorie_coursService.updateCategory(id, category);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categorie_coursService.deleteCategory(id);
    }
}
