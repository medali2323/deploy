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
import com.example.pfe.models.LigneFormation;
import com.example.pfe.services.LigneFormationService;


@RestController
@RequestMapping("/api/LigneFormation")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR') or hasRole('CANDIDAT')")

public class LigneFormationController {
    @Autowired
    private LigneFormationService LigneFormationService;

    @GetMapping
    public ResponseEntity<List<LigneFormation>> getAllLigneFormations() {
        List<LigneFormation> LigneFormations = LigneFormationService.getAllLigneFormations();
        return new ResponseEntity<>(LigneFormations, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LigneFormation> getLigneFormationById(@PathVariable Long id) {
    	LigneFormation LigneFormation = LigneFormationService.getLigneFormationById(id);
        return LigneFormation != null ?
                new ResponseEntity<>(LigneFormation, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<LigneFormation> addLigneFormation(@RequestBody LigneFormation LigneFormation) {
        LigneFormation newLigneFormation = LigneFormationService.addLigneFormation(LigneFormation);
        return new ResponseEntity<>(newLigneFormation, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LigneFormation> updateLigneFormation(@PathVariable Long id, @RequestBody LigneFormation LigneFormation) {
        LigneFormation updatedLigneFormation = LigneFormationService.updateLigneFormation(id, LigneFormation);
        return updatedLigneFormation != null ?
                new ResponseEntity<>(updatedLigneFormation, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLigneFormation(@PathVariable Long id) {
    	System.out.println("id : "+id);
    	LigneFormationService.deleteLigneFormation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/condidat/{condidatId}")
    public List<LigneFormation> getCoursByCondidatId(@PathVariable Long condidatId) {
    return LigneFormationService.getLigneFormationByCondidatId(condidatId);
}
    @GetMapping("/condidat/{condidatId}/{formationId}")
    public List<LigneFormation> getCoursByCondidatId(@PathVariable Long condidatId,@PathVariable Long formationId) {
    return LigneFormationService.getLigneFormationByCondidatIdFormation_Id(condidatId,formationId);
}
}
