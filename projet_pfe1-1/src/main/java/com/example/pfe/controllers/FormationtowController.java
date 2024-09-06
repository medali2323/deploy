package com.example.pfe.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.CourAlaDemande;
import com.example.pfe.models.CourPresentiel;
import com.example.pfe.models.Cours;
import com.example.pfe.models.CoursEnLigne;
import com.example.pfe.models.Formation;
import com.example.pfe.models.FormationAlaDemande;
import com.example.pfe.models.FormationEnLigne;
import com.example.pfe.models.FormationPresentiel;
import com.example.pfe.services.CoursService;
import com.example.pfe.services.CourAlaDemandeService;
import com.example.pfe.services.CoursEnLigneService;
import com.example.pfe.services.CourPresentielService;
import com.example.pfe.services.FormationService;
import com.example.pfe.services.FormationAlaDemandeService;
import com.example.pfe.services.FormationPresentielService;
import com.example.pfe.services.FormationEnLigneService;

import java.util.List;

@RestController
@RequestMapping("/global/")

public class FormationtowController {
    @Autowired
    private FormationService FormationService;
    @Autowired
    private CoursService CoursService;
    @Autowired
    private CourAlaDemandeService CourAlaDemandeService;
    @Autowired
    private CoursEnLigneService CoursEnLigneService;
    @Autowired
    private CourPresentielService CourPresentielService;
    
	@Autowired
    private FormationEnLigneService FormationEnLigneService;
    
    @Autowired
    private FormationPresentielService FormationPresentielService;
    
    @Autowired
    private FormationAlaDemandeService FormationAlaDemandeService;
    
    
    
    
    
    
    
    
    
    @GetMapping("formation/approuves")
    public List<Formation> getAllFormationsApprouve() {
        return FormationService.findAllApprouve();
    }

    @GetMapping("formation/non-approuves")
    public List<Formation> getAllFormationsNonApprouve() {
        return FormationService.findAllNonApprouve();
    }
    @GetMapping("cours/approuves")
    public List<Cours> getAllCoursApprouves() {
        return CoursService.findAllApprouve();
    }

    @GetMapping("cours/non-approuves")
    public List<Cours> getAllCoursNonApprouves() {
        return CoursService.findAllNonApprouve();
    }
    @GetMapping("CourAlaDemande/approuves")
    public List<CourAlaDemande> getAllCourAlaDemandeApprouves() {
        return CourAlaDemandeService.findAllApprouve();
    }
    @GetMapping("CoursEnLigne/approuves")
    public List<CoursEnLigne> getAllCoursEnLigneApprouves() {
        return CoursEnLigneService.findAllApprouve();
    }
    @GetMapping("CourPresentiels/approuves")
    public List<CourPresentiel> getAllCourPresentielApprouves() {
        return CourPresentielService.findAllApprouve();
    }
    @GetMapping("formationAlaDemande/approuves")
    public List<FormationAlaDemande> getAllformationAlaDemandeApprouves() {
        return FormationAlaDemandeService.findAllApprouve();
    }
    @GetMapping("formationsEnLigne/approuves")
    public List<FormationEnLigne> getAllformationsEnLigneApprouves() {
        return FormationEnLigneService.findAllApprouve();
    }
    @GetMapping("formationPresentiels/approuves")
    public List<FormationPresentiel> getAllformationPresentielApprouves() {
        return FormationPresentielService.findAllApprouve();
    }
	

}
