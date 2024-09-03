package com.example.pfe.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.example.pfe.models.Evenement;
import com.example.pfe.services.EvenementService;

@RestController
@RequestMapping("/api/evenements")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")

public class EvenementController {

    @Autowired
    private EvenementService evenementService;

    @GetMapping()
    public List<Evenement> getAllEvenements() {
        return evenementService.getAllEvenements();
    }
    @GetMapping("/approuves")
    public List<Evenement> getAllEvenementsApprouve() {
        return evenementService.findAllApprouve();
    }

    @GetMapping("/non-approuves")
    public List<Evenement> getAllEvenementsNonApprouve() {
        return evenementService.findAllNonApprouve();
    }
}
