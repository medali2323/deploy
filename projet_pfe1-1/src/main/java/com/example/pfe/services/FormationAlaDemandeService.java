package com.example.pfe.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pfe.models.FormationAlaDemande;
import com.example.pfe.models.FormationAlaDemande;
import com.example.pfe.repository.FormationAlaDemandeRepository;

import java.util.List;

@Service
public class FormationAlaDemandeService {

    @Autowired
    private FormationAlaDemandeRepository FormationAlaDemandeRepository;

    public List<FormationAlaDemande> getAllFormationAlaDemande() {
        return FormationAlaDemandeRepository.findAll();
    }

    public FormationAlaDemande getFormationAlaDemandeById(Long id) {
        return FormationAlaDemandeRepository.findById(id).orElse(null);
    }

    public FormationAlaDemande addFormationAlaDemande(FormationAlaDemande FormationAlaDemande) {
        return FormationAlaDemandeRepository.save(FormationAlaDemande);
    }

    public FormationAlaDemande updateFormationAlaDemande(Long id, FormationAlaDemande FormationAlaDemande) {
        if (FormationAlaDemandeRepository.existsById(id)) {
            FormationAlaDemande.setId(id);
            return FormationAlaDemandeRepository.save(FormationAlaDemande);
        }
        return null;
    }
    public void deleteFormations(Long id) {
    	FormationAlaDemandeRepository.deleteById(id);
    }
    public List<FormationAlaDemande> findAllApprouve() {
        return FormationAlaDemandeRepository.findByApprouve(true);
    }

    public List<FormationAlaDemande> findAllNonApprouve() {
        return FormationAlaDemandeRepository.findByApprouve(false);
    }

    public List<FormationAlaDemande> findByInstructorId(Long instructorId) {
        return FormationAlaDemandeRepository.findByInstructorId(instructorId);
    }
    public List<FormationAlaDemande> getFormationAlaDemandeByCondidatId(Long condidatId) {
        return FormationAlaDemandeRepository.findByCondidatId(condidatId);
    }
}
