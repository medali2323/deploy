package com.example.pfe.controllers;

 import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.CoursEnLigne;
import com.example.pfe.models.CoursEnLigne;
import com.example.pfe.services.CoursEnLigneService;

import java.util.List;

@RestController
@RequestMapping("/api/CoursEnLigne")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR') or hasRole('CANDIDAT')")

public class CoursEnLigneController {
    @Autowired
    private CoursEnLigneService CoursEnLigneService;
    
    @GetMapping
    public ResponseEntity<List<CoursEnLigne>> getAllCoursEnLignes() {
        List<CoursEnLigne> CoursEnLignes = CoursEnLigneService.getAllCoursEnLigne();
        return new ResponseEntity<>(CoursEnLignes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CoursEnLigne> getCoursEnLigneById(@PathVariable Long id) {
    	CoursEnLigne CoursEnLigne = CoursEnLigneService.getCoursEnLigneById(id);
        return CoursEnLigne != null ?
                new ResponseEntity<>(CoursEnLigne, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<CoursEnLigne> addCoursEnLigne(@RequestBody CoursEnLigne CoursEnLigne) {
        CoursEnLigne newCoursEnLigne = CoursEnLigneService.addCoursEnLigne(CoursEnLigne);
        return new ResponseEntity<>(newCoursEnLigne, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CoursEnLigne> updateCoursEnLigne(@PathVariable Long id, @RequestBody CoursEnLigne CoursEnLigne) {
        CoursEnLigne updatedCoursEnLigne = CoursEnLigneService.updateCoursEnLigne(id, CoursEnLigne);
        return updatedCoursEnLigne != null ?
                new ResponseEntity<>(updatedCoursEnLigne, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoursEnLigne(@PathVariable Long id) {
        CoursEnLigneService.deleteCours(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/approuves")
    public List<CoursEnLigne> getAllCoursEnLigneApprouves() {
        return CoursEnLigneService.findAllApprouve();
    }

    @GetMapping("/non-approuves")
    public List<CoursEnLigne> getAllCoursEnLigneNonApprouves() {
        return CoursEnLigneService.findAllNonApprouve();
    }
    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<List<CoursEnLigne>> getCoursEnLigneByInstructor(@PathVariable Long instructorId) {
        List<CoursEnLigne> CoursEnLigne = CoursEnLigneService.findByInstructorId(instructorId);
        if (CoursEnLigne.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(CoursEnLigne, HttpStatus.OK);
    }
    @PreAuthorize("hasRole('CANDIDAT')")
    @GetMapping("/condidat/{condidatId}")
    public List<CoursEnLigne> getCoursEnLigneByCondidatId(@PathVariable Long condidatId) {
        return CoursEnLigneService.getCoursEnLigneByCondidatId(condidatId);
    }
    @GetMapping("somme")
    public ResponseEntity<Integer> sommecal() {
        int courAlaDemandes = CoursEnLigneService.sommecel();
        return new ResponseEntity<>(courAlaDemandes, HttpStatus.OK);
    }
}

