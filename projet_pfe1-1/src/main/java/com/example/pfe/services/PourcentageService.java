package com.example.pfe.services;

import org.apache.el.stream.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pfe.models.Pourcentage;
import com.example.pfe.repository.PourcentageRepository;

import java.util.List;

@Service
public class PourcentageService {
    @Autowired
    private PourcentageRepository PourcentageRepository;

    public List<Pourcentage> getAllPourcentage() {
        return PourcentageRepository.findAll();
    }

    public Pourcentage getPourcentageById(Long id) {
        return PourcentageRepository.findById(id).orElse(null);
    }

    public Pourcentage addPourcentage(Pourcentage Pourcentage) {
        return PourcentageRepository.save(Pourcentage);
    }

    public Pourcentage updatePourcentage(Long id, Pourcentage Pourcentage) {
        if (PourcentageRepository.existsById(id)) {
            return PourcentageRepository.save(Pourcentage);
        }
        return null;
    }

    public void deletePourcentage(Long id) {
        PourcentageRepository.deleteById(id);
    }
    public Pourcentage getPourcentageByCategoryId(Long id) {
        return PourcentageRepository.findByCategoriesInstructeursId(id);
    }
}
