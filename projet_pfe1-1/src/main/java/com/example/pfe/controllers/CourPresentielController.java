package com.example.pfe.controllers;

 import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.CourPresentiel;
import com.example.pfe.models.CourPresentiel;
import com.example.pfe.models.Cours;
import com.example.pfe.services.CourPresentielService;

import java.util.List;

@RestController
@RequestMapping("/api/CourPresentiel")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR') or hasRole('CANDIDAT')")

public class CourPresentielController {
    @Autowired
    private CourPresentielService CourPresentielService;
    
    @GetMapping
    public ResponseEntity<List<CourPresentiel>> getAllCourPresentiels() {
        List<CourPresentiel> CourPresentiels = CourPresentielService.getAllCourPresentiel();
        return new ResponseEntity<>(CourPresentiels, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourPresentiel> getCourPresentielById(@PathVariable Long id) {
    	CourPresentiel CourPresentiel = CourPresentielService.getCourPresentielById(id);
        return CourPresentiel != null ?
                new ResponseEntity<>(CourPresentiel, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<CourPresentiel> addCourPresentiel(@RequestBody CourPresentiel CourPresentiel) {
        CourPresentiel newCourPresentiel = CourPresentielService.addCourPresentiel(CourPresentiel);
        return new ResponseEntity<>(newCourPresentiel, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourPresentiel> updateCourPresentiel(@PathVariable Long id, @RequestBody CourPresentiel CourPresentiel) {
        CourPresentiel updatedCourPresentiel = CourPresentielService.updateCourPresentiel(id, CourPresentiel);
        return updatedCourPresentiel != null ?
                new ResponseEntity<>(updatedCourPresentiel, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourPresentiel(@PathVariable Long id) {
        CourPresentielService.deleteCours(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/approuves")
    public List<CourPresentiel> getAllCourPresentielApprouves() {
        return CourPresentielService.findAllApprouve();
    }

    @GetMapping("/non-approuves")
    public List<CourPresentiel> getAllCourPresentielNonApprouves() {
        return CourPresentielService.findAllNonApprouve();
    }
    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<List<CourPresentiel>> getCourPresentielByInstructor(@PathVariable Long instructorId) {
        List<CourPresentiel> CourPresentiel = CourPresentielService.findByInstructorId(instructorId);
        if (CourPresentiel.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(CourPresentiel, HttpStatus.OK);
    }
    @PreAuthorize("hasRole('CANDIDAT')")
    @GetMapping("/condidat/{condidatId}")
    public List<CourPresentiel> getCourPresentielByCondidatId(@PathVariable Long condidatId) {
        return CourPresentielService.getCourPresentielByCondidatId(condidatId);
    }
    @GetMapping("somme")
    public ResponseEntity<Integer> sommecal() {
        int courAlaDemandes = CourPresentielService.sommecp();
        return new ResponseEntity<>(courAlaDemandes, HttpStatus.OK);
    }
}
