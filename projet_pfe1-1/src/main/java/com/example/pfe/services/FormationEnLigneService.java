package com.example.pfe.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pfe.models.FormationEnLigne;
import com.example.pfe.models.FormationEnLigne;
import com.example.pfe.repository.FormationEnLigneRepository;

import java.util.List;

@Service
public class FormationEnLigneService {

    @Autowired
    private FormationEnLigneRepository FormationEnLigneRepository;

    public List<FormationEnLigne> getAllFormationEnLigne() {
        return FormationEnLigneRepository.findAll();
    }

    public FormationEnLigne getFormationEnLigneById(Long id) {
        return FormationEnLigneRepository.findById(id).orElse(null);
    }

    public FormationEnLigne addFormationEnLigne(FormationEnLigne FormationEnLigne) {
        return FormationEnLigneRepository.save(FormationEnLigne);
    }

    public FormationEnLigne updateFormationEnLigne(Long id, FormationEnLigne FormationEnLigne) {
        if (FormationEnLigneRepository.existsById(id)) {
            FormationEnLigne.setId(id);
            return FormationEnLigneRepository.save(FormationEnLigne);
        }
        return null;
    }
    public void deleteFormations(Long id) {
    	FormationEnLigneRepository.deleteById(id);
    }
    public List<FormationEnLigne> findAllApprouve() {
        return FormationEnLigneRepository.findByApprouve(true);
    }

    public List<FormationEnLigne> findAllNonApprouve() {
        return FormationEnLigneRepository.findByApprouve(false);
    }

    public List<FormationEnLigne> findByInstructorId(Long instructorId) {
        return FormationEnLigneRepository.findByInstructorId(instructorId);
    }
    public List<FormationEnLigne> getFormationEnLigneByCondidatId(Long condidatId) {
        return FormationEnLigneRepository.findByCondidatId(condidatId);
    }
}
