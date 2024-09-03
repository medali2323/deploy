package com.example.pfe.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.CategCondidat;
import com.example.pfe.services.CategCondidatService;

import java.util.List;

@RestController
@RequestMapping("/api/CategCondidat")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")

public class CategCondidatController {
    @Autowired
    private CategCondidatService CategCondidatService;

    @GetMapping
    public ResponseEntity<List<CategCondidat>> getAllCategCondidats() {
        List<CategCondidat> CategCondidats = CategCondidatService.getAllCategories();
        return new ResponseEntity<>(CategCondidats, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategCondidat> getCategCondidatById(@PathVariable Long id) {
    	CategCondidat CategCondidat = CategCondidatService.getCategoryById(id);
        return CategCondidat != null ?
                new ResponseEntity<>(CategCondidat, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<CategCondidat> addCategCondidat(@RequestBody CategCondidat CategCondidat) {
        CategCondidat newCategCondidat = CategCondidatService.addCategory(CategCondidat);
        return new ResponseEntity<>(newCategCondidat, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategCondidat> updateCategCondidat(@PathVariable Long id, @RequestBody CategCondidat CategCondidat) {
        CategCondidat updatedCategCondidat = CategCondidatService.updateCategory(id, CategCondidat);
        return updatedCategCondidat != null ?
                new ResponseEntity<>(updatedCategCondidat, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategCondidat(@PathVariable Long id) {
        CategCondidatService.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
