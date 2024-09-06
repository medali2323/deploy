package com.example.pfe.controllers;

 import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.FormationAlaDemande;
import com.example.pfe.services.FormationAlaDemandeService;

import java.util.List;

@RestController
@RequestMapping("/api/FormationAlaDemande")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR') or hasRole('CANDIDAT')")

public class FormationAlaDemandeController {
    @Autowired
    private FormationAlaDemandeService FormationAlaDemandeService;
    
    @GetMapping
    public ResponseEntity<List<FormationAlaDemande>> getAllFormationAlaDemandes() {
        List<FormationAlaDemande> FormationAlaDemandes = FormationAlaDemandeService.getAllFormationAlaDemande();
        return new ResponseEntity<>(FormationAlaDemandes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FormationAlaDemande> getFormationAlaDemandeById(@PathVariable Long id) {
    	FormationAlaDemande FormationAlaDemande = FormationAlaDemandeService.getFormationAlaDemandeById(id);
        return FormationAlaDemande != null ?
                new ResponseEntity<>(FormationAlaDemande, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<FormationAlaDemande> addFormationAlaDemande(@RequestBody FormationAlaDemande FormationAlaDemande) {
        FormationAlaDemande newFormationAlaDemande = FormationAlaDemandeService.addFormationAlaDemande(FormationAlaDemande);
        return new ResponseEntity<>(newFormationAlaDemande, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FormationAlaDemande> updateFormationAlaDemande(@PathVariable Long id, @RequestBody FormationAlaDemande FormationAlaDemande) {
        FormationAlaDemande updatedFormationAlaDemande = FormationAlaDemandeService.updateFormationAlaDemande(id, FormationAlaDemande);
        return updatedFormationAlaDemande != null ?
                new ResponseEntity<>(updatedFormationAlaDemande, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFormationAlaDemande(@PathVariable Long id) {
        FormationAlaDemandeService.deleteFormations(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
   
}
