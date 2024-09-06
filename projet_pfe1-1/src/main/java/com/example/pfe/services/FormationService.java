package com.example.pfe.services;

import com.example.pfe.models.Cours;
import com.example.pfe.models.Formation;
import com.example.pfe.repository.FormationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FormationService {
    @Autowired
    private FormationRepository formationRepository;

    public List<Formation> getAllFormations() {
        return formationRepository.findAll();
    }

    public Formation getFormationById(Long id) {
        return formationRepository.findById(id).orElse(null);
    }

    public Formation addFormation(Formation formation) {
        return formationRepository.save(formation);
    }

    public Formation updateFormation(Long id, Formation formation) {
        if (formationRepository.existsById(id)) {
            formation.setId(id);
            return formationRepository.save(formation);
        }
        return null;
    }

    public void deleteFormation(Long id) {
        formationRepository.deleteById(id);
    }
    public List<Formation> findAllApprouve() {
        return formationRepository.findByApprouve(true);
    }

    public List<Formation> findAllNonApprouve() {
        return formationRepository.findByApprouve(false);
    }
    public List<Formation> findByInstructorId(Long instructorId) {
        return formationRepository.findByInstructorId(instructorId);
    }
}
