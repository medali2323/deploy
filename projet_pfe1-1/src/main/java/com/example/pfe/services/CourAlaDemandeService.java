package com.example.pfe.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pfe.models.CourAlaDemande;
import com.example.pfe.models.CourAlaDemande;
import com.example.pfe.repository.CourAlaDemandeRepository;

import java.util.List;

@Service
public class CourAlaDemandeService {

    @Autowired
    private CourAlaDemandeRepository courAlaDemandeRepository;

    public List<CourAlaDemande> getAllCourAlaDemande() {
        return courAlaDemandeRepository.findAll();
    }

    public CourAlaDemande getCourAlaDemandeById(Long id) {
        return courAlaDemandeRepository.findById(id).orElse(null);
    }

    public CourAlaDemande addCourAlaDemande(CourAlaDemande CourAlaDemande) {
        return courAlaDemandeRepository.save(CourAlaDemande);
    }

    public CourAlaDemande updateCourAlaDemande(Long id, CourAlaDemande CourAlaDemande) {
        if (courAlaDemandeRepository.existsById(id)) {
            CourAlaDemande.setId(id);
            return courAlaDemandeRepository.save(CourAlaDemande);
        }
        return null;
    }
    public void deleteCourAlaDemande(Long id) {
    	courAlaDemandeRepository.deleteById(id);
    }

    public List<CourAlaDemande> findAllApprouve() {
        return courAlaDemandeRepository.findByApprouve(true);
    }

    public List<CourAlaDemande> findAllNonApprouve() {
        return courAlaDemandeRepository.findByApprouve(false);
    }

    public List<CourAlaDemande> findByInstructorId(Long instructorId) {
        return courAlaDemandeRepository.findByInstructorId(instructorId);
    }
    public List<CourAlaDemande> getCourAlaDemandeByCondidatId(Long condidatId) {
        return courAlaDemandeRepository.findByCondidatId(condidatId);
    }
    public int sommecal() {
        return courAlaDemandeRepository.sommecal();
    }

}
