package com.example.pfe.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.dto.CoursWithLigneCoursDTO;
import com.example.pfe.models.Cours;
import com.example.pfe.services.CoursService;
import com.example.pfe.services.LigneCoursService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/Cours")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR') or hasRole('CANDIDAT')")

public class CoursController {
    @Autowired
    private CoursService CoursService;
    @Autowired
    private LigneCoursService ligneCoursService;

    @GetMapping
    public ResponseEntity<List<Cours>> getAllCourss() {
        List<Cours> Courss = CoursService.getAllCours();
        return new ResponseEntity<>(Courss, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cours> getCoursById(@PathVariable Long id) {
    	Cours Cours = CoursService.getCoursById(id);
        return Cours != null ?
                new ResponseEntity<>(Cours, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Cours> addCours(@RequestBody Cours Cours) {
        Cours newCours = CoursService.addCours(Cours);
        return new ResponseEntity<>(newCours, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cours> updateCours(@PathVariable Long id, @RequestBody Cours Cours) {
        Cours updatedCours = CoursService.updateCours(id, Cours);
        return updatedCours != null ?
                new ResponseEntity<>(updatedCours, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCours(@PathVariable Long id) {
        CoursService.deleteCours(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/approuves")
    public List<Cours> getAllCoursApprouves() {
        return CoursService.findAllApprouve();
    }

    @GetMapping("/non-approuves")
    public List<Cours> getAllCoursNonApprouves() {
        return CoursService.findAllNonApprouve();
    }
    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<List<Cours>> getCoursByInstructor(@PathVariable Long instructorId) {
    	System.out.println("aaaa");
        List<Cours> cours = CoursService.findByInstructorId(instructorId);
        if (cours.isEmpty()) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        }
        return new ResponseEntity<>(cours, HttpStatus.OK);
    }
    @PreAuthorize("hasRole('CANDIDAT')")
    @GetMapping("/condidat/{condidatId}")
    public List<Cours> getCoursByCondidatId(@PathVariable Long condidatId) {
        return CoursService.getCoursByCondidatId(condidatId);
    }
}
