package com.example.pfe.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.Formation;
import com.example.pfe.services.FormationService;

import java.util.List;

@RestController
@RequestMapping("/global/formation")

public class FormationtowController {
    @Autowired
    private FormationService FormationService;

    
    @GetMapping("/approuves")
    public List<Formation> getAllFormationsApprouve() {
        return FormationService.findAllApprouve();
    }

    @GetMapping("/non-approuves")
    public List<Formation> getAllFormationsNonApprouve() {
        return FormationService.findAllNonApprouve();
    }
}
