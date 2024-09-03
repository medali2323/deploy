package com.example.pfe.services;

import com.example.pfe.models.Pays;
import com.example.pfe.repository.PaysRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaysService {
    @Autowired
    private PaysRepository paysRepository;

    public List<Pays> getAllPays() {
        return paysRepository.findAll();
    }

    public Pays getPaysById(Long id) {
        return paysRepository.findById(id).orElse(null);
    }

    public Pays addPays(Pays pays) {
        return paysRepository.save(pays);
    }

    public Pays updatePays(Long id, Pays pays) {
        if (paysRepository.existsById(id)) {
            pays.setId(id);
            return paysRepository.save(pays);
        }
        return null;
    }

    public void deletePays(Long id) {
        paysRepository.deleteById(id);
    }
}
