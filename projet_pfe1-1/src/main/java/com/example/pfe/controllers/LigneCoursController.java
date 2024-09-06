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

import com.example.pfe.models.Condidat;
import com.example.pfe.models.Instructor;
import com.example.pfe.models.LigneCours;
import com.example.pfe.services.LigneCoursService;


@RestController
@RequestMapping("/api/LigneCours")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR') or hasRole('CANDIDAT')")

public class LigneCoursController {
    @Autowired
    private LigneCoursService LigneCoursService;

    @GetMapping
    public ResponseEntity<List<LigneCours>> getAllLigneCourss() {
        List<LigneCours> LigneCourss = LigneCoursService.getAllLigneCourss();
        return new ResponseEntity<>(LigneCourss, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LigneCours> getLigneCoursById(@PathVariable Long id) {
    	LigneCours LigneCours = LigneCoursService.getLigneCoursById(id);
        return LigneCours != null ?
                new ResponseEntity<>(LigneCours, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<LigneCours> addLigneCours(@RequestBody LigneCours LigneCours) {
        LigneCours newLigneCours = LigneCoursService.addLigneCours(LigneCours);
        return new ResponseEntity<>(newLigneCours, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LigneCours> updateLigneCours(@PathVariable Long id, @RequestBody LigneCours LigneCours) {
        LigneCours updatedLigneCours = LigneCoursService.updateLigneCours(id, LigneCours);
        return updatedLigneCours != null ?
                new ResponseEntity<>(updatedLigneCours, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLigneCours(@PathVariable Long id) {
    	System.out.println("id : "+id);
    	LigneCoursService.deleteLigneCours(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
 
    @GetMapping("/condidat/{condidatId}")
    public List<LigneCours> getCoursByCondidatId(@PathVariable Long condidatId) {
        return LigneCoursService.getCoursByCondidatId(condidatId);
    }
    @GetMapping("/condidat/{condidatId}/{coursId}")
    public List<LigneCours> getCoursByCondidatId(@PathVariable Long condidatId,@PathVariable Long coursId) {
    return LigneCoursService.getLigneCoursByCondidatIdCours_Id(condidatId,coursId);
}
}

