package com.example.pfe.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pfe.models.CoursEnLigne;
import com.example.pfe.models.CoursEnLigne;
import com.example.pfe.repository.CoursEnLigneRepository;

import java.util.List;

@Service
public class CoursEnLigneService {

    @Autowired
    private CoursEnLigneRepository CoursEnLigneRepository;

    public List<CoursEnLigne> getAllCoursEnLigne() {
        return CoursEnLigneRepository.findAll();
    }

    public CoursEnLigne getCoursEnLigneById(Long id) {
        return CoursEnLigneRepository.findById(id).orElse(null);
    }

    public CoursEnLigne addCoursEnLigne(CoursEnLigne CoursEnLigne) {
        return CoursEnLigneRepository.save(CoursEnLigne);
    }
    public int sommecel() {
        return CoursEnLigneRepository.sommecel();
    }

    public CoursEnLigne updateCoursEnLigne(Long id, CoursEnLigne CoursEnLigne) {
        if (CoursEnLigneRepository.existsById(id)) {
            CoursEnLigne.setId(id);
            return CoursEnLigneRepository.save(CoursEnLigne);
        }
        return null;
    }
    public void deleteCours(Long id) {
    	CoursEnLigneRepository.deleteById(id);
    }
    public List<CoursEnLigne> findAllApprouve() {
        return CoursEnLigneRepository.findByApprouve(true);
    }

    public List<CoursEnLigne> findAllNonApprouve() {
        return CoursEnLigneRepository.findByApprouve(false);
    }

    public List<CoursEnLigne> findByInstructorId(Long instructorId) {
        return CoursEnLigneRepository.findByInstructorId(instructorId);
    }
    public List<CoursEnLigne> getCoursEnLigneByCondidatId(Long condidatId) {
        return CoursEnLigneRepository.findByCondidatId(condidatId);
    }
}
