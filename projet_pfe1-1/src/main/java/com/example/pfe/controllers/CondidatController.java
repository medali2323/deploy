package com.example.pfe.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.Condidat;
import com.example.pfe.services.CondidatService;

import java.util.List;

@RestController
@RequestMapping("/api/Condidat")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")

public class CondidatController {
    @Autowired
    private CondidatService CondidatService;

    @GetMapping
    public ResponseEntity<List<Condidat>> getAllCondidats() {
        List<Condidat> Condidats = CondidatService.getAllCondidats();
        return new ResponseEntity<>(Condidats, HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR') or hasRole('CANDIDAT') ")
    @GetMapping("/{id}")
    public ResponseEntity<Condidat> getCondidatById(@PathVariable Long id) {
    	Condidat Condidat = CondidatService.getCondidatById(id);
        return Condidat != null ?
                new ResponseEntity<>(Condidat, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Condidat> addCondidat(@RequestBody Condidat Condidat) {
        Condidat newCondidat = CondidatService.addCondidat(Condidat);
        return new ResponseEntity<>(newCondidat, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Condidat> updateCondidat(@PathVariable Long id, @RequestBody Condidat Condidat) {
        Condidat updatedCondidat = CondidatService.updateCondidat(id, Condidat);
        return updatedCondidat != null ?
                new ResponseEntity<>(updatedCondidat, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCondidat(@PathVariable Long id) {
        CondidatService.deleteCondidat(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<List<Condidat>> getCondidatsByInstructor(@PathVariable Long instructorId) {
        List<Condidat> condidats = CondidatService.getCondidatsByInstructor(instructorId);
        return ResponseEntity.ok(condidats);
    }
}
