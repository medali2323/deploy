package com.example.pfe.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pfe.models.FormationPresentiel;
import com.example.pfe.models.FormationPresentiel;
import com.example.pfe.repository.FormationPresentielRepository;

import java.util.List;

@Service
public class FormationPresentielService {

    @Autowired
    private FormationPresentielRepository FormationPresentielRepository;

    public List<FormationPresentiel> getAllFormationPresentiel() {
        return FormationPresentielRepository.findAll();
    }

    public FormationPresentiel getFormationPresentielById(Long id) {
        return FormationPresentielRepository.findById(id).orElse(null);
    }

    public FormationPresentiel addFormationPresentiel(FormationPresentiel FormationPresentiel) {
        return FormationPresentielRepository.save(FormationPresentiel);
    }

    public FormationPresentiel updateFormationPresentiel(Long id, FormationPresentiel FormationPresentiel) {
        if (FormationPresentielRepository.existsById(id)) {
            FormationPresentiel.setId(id);
            return FormationPresentielRepository.save(FormationPresentiel);
        }
        return null;
    }
    public void deleteFormations(Long id) {
    	FormationPresentielRepository.deleteById(id);
    }
    public List<FormationPresentiel> findAllApprouve() {
        return FormationPresentielRepository.findByApprouve(true);
    }

    public List<FormationPresentiel> findAllNonApprouve() {
        return FormationPresentielRepository.findByApprouve(false);
    }

    public List<FormationPresentiel> findByInstructorId(Long instructorId) {
        return FormationPresentielRepository.findByInstructorId(instructorId);
    }
    public List<FormationPresentiel> getFormationPresentielByCondidatId(Long condidatId) {
        return FormationPresentielRepository.findByCondidatId(condidatId);
    }
}
