package com.example.pfe.services;

import com.example.pfe.models.SalleDeSport;
import com.example.pfe.repository.SalleDeSportRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalleDeSportService {
    @Autowired
    private SalleDeSportRepository salleDeSportRepository;

    public List<SalleDeSport> getAllSallesDeSport() {
        return salleDeSportRepository.findAll();
    }

    public SalleDeSport getSalleDeSportById(Long id) {
        return salleDeSportRepository.findById(id).orElse(null);
    }

    public SalleDeSport addSalleDeSport(SalleDeSport salleDeSport) {
        return salleDeSportRepository.save(salleDeSport);
    }

    public SalleDeSport updateSalleDeSport(Long id, SalleDeSport salleDeSport) {
        if (salleDeSportRepository.existsById(id)) {
            salleDeSport.setId(id);
            return salleDeSportRepository.save(salleDeSport);
        }
        return null;
    }

    public void deleteSalleDeSport(Long id) {
        salleDeSportRepository.deleteById(id);
    }
}
