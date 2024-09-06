package com.example.pfe.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pfe.models.CourPresentiel;
import com.example.pfe.models.CourPresentiel;
import com.example.pfe.repository.CourPresentielRepository;

import java.util.List;

@Service
public class CourPresentielService {

    @Autowired
    private CourPresentielRepository courPresentielRepository;

    public List<CourPresentiel> getAllCourPresentiel() {
        return courPresentielRepository.findAll();
    }

    public CourPresentiel getCourPresentielById(Long id) {
        return courPresentielRepository.findById(id).orElse(null);
    }

    public CourPresentiel addCourPresentiel(CourPresentiel CourPresentiel) {
        return courPresentielRepository.save(CourPresentiel);
    }

    public CourPresentiel updateCourPresentiel(Long id, CourPresentiel CourPresentiel) {
        if (courPresentielRepository.existsById(id)) {
            CourPresentiel.setId(id);
            return courPresentielRepository.save(CourPresentiel);
        }
        return null;
    }
    public void deleteCours(Long id) {
    	courPresentielRepository.deleteById(id);
    }
    public List<CourPresentiel> findAllApprouve() {
        return courPresentielRepository.findByApprouve(true);
    }

    public List<CourPresentiel> findAllNonApprouve() {
        return courPresentielRepository.findByApprouve(false);
    }

    public List<CourPresentiel> findByInstructorId(Long instructorId) {
        return courPresentielRepository.findByInstructorId(instructorId);
    }
    public List<CourPresentiel> getCourPresentielByCondidatId(Long condidatId) {
        return courPresentielRepository.findByCondidatId(condidatId);
    }
    public int sommecp() {
        return courPresentielRepository.sommecp();
    }
}
