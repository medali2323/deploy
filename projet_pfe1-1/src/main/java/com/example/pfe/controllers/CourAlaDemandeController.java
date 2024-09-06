package com.example.pfe.controllers;

 import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.CourAlaDemande;
import com.example.pfe.services.CourAlaDemandeService;

import java.util.List;

@RestController
@RequestMapping("/api/CourAlaDemande")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR') or hasRole('CANDIDAT')")

public class CourAlaDemandeController {
    @Autowired
    private CourAlaDemandeService CourAlaDemandeService;
    
    @GetMapping
    public ResponseEntity<List<CourAlaDemande>> getAllCourAlaDemandes() {
        List<CourAlaDemande> CourAlaDemandes = CourAlaDemandeService.getAllCourAlaDemande();
        return new ResponseEntity<>(CourAlaDemandes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourAlaDemande> getCourAlaDemandeById(@PathVariable Long id) {
    	CourAlaDemande CourAlaDemande = CourAlaDemandeService.getCourAlaDemandeById(id);
        return CourAlaDemande != null ?
                new ResponseEntity<>(CourAlaDemande, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<CourAlaDemande> addCourAlaDemande(@RequestBody CourAlaDemande CourAlaDemande) {
        CourAlaDemande newCourAlaDemande = CourAlaDemandeService.addCourAlaDemande(CourAlaDemande);
        return new ResponseEntity<>(newCourAlaDemande, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourAlaDemande> updateCourAlaDemande(@PathVariable Long id, @RequestBody CourAlaDemande CourAlaDemande) {
        CourAlaDemande updatedCourAlaDemande = CourAlaDemandeService.updateCourAlaDemande(id, CourAlaDemande);
        return updatedCourAlaDemande != null ?
                new ResponseEntity<>(updatedCourAlaDemande, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourAlaDemande(@PathVariable Long id) {
        CourAlaDemandeService.deleteCourAlaDemande(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/approuves")
    public List<CourAlaDemande> getAllCourAlaDemandeApprouves() {
        return CourAlaDemandeService.findAllApprouve();
    }

    @GetMapping("/non-approuves")
    public List<CourAlaDemande> getAllCourAlaDemandeNonApprouves() {
        return CourAlaDemandeService.findAllNonApprouve();
    }
    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<List<CourAlaDemande>> getCourAlaDemandeByInstructor(@PathVariable Long instructorId) {
        List<CourAlaDemande> CourAlaDemande = CourAlaDemandeService.findByInstructorId(instructorId);
        if (CourAlaDemande.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(CourAlaDemande, HttpStatus.OK);
    }
    @PreAuthorize("hasRole('CANDIDAT')")
    @GetMapping("/condidat/{condidatId}")
    public List<CourAlaDemande> getCourAlaDemandeByCondidatId(@PathVariable Long condidatId) {
        return CourAlaDemandeService.getCourAlaDemandeByCondidatId(condidatId);
    }
    @GetMapping("somme")
    public ResponseEntity<Integer> sommecal() {
        int courAlaDemandes = CourAlaDemandeService.sommecal();
        return new ResponseEntity<>(courAlaDemandes, HttpStatus.OK);
    }
}
