package com.example.pfe.services;

import com.example.pfe.models.Cours;
import com.example.pfe.repository.CoursRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoursService {
    @Autowired
    private CoursRepository coursRepository;

    public List<Cours> getAllCours() {
        return coursRepository.findAll();
    }

    public Cours getCoursById(Long id) {
        return coursRepository.findById(id).orElse(null);
    }

    public Cours addCours(Cours cours) {
        return coursRepository.save(cours);
    }

    public Cours updateCours(Long id, Cours cours) {
        if (coursRepository.existsById(id)) {
            cours.setId(id);
            return coursRepository.save(cours);
        }
        return null;
    }

    public void deleteCours(Long id) {
        coursRepository.deleteById(id);
    }
    public List<Cours> findAllApprouve() {
        return coursRepository.findByApprouve(true);
    }

    public List<Cours> findAllNonApprouve() {
        return coursRepository.findByApprouve(false);
    }

    public List<Cours> findByInstructorId(Long instructorId) {
        return coursRepository.findByInstructorId(instructorId);
    }
    public List<Cours> getCoursByCondidatId(Long condidatId) {
        return coursRepository.findByCondidatId(condidatId);
    }
}
