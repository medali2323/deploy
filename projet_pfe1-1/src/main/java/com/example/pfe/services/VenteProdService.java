package com.example.pfe.services;

import com.example.pfe.models.Vente_prod;
import com.example.pfe.repository.Vente_prodRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VenteProdService {
    @Autowired
    private Vente_prodRepository venteProdRepository;

    public List<Vente_prod> getAllVenteProds() {
        return venteProdRepository.findAll();
    }

    public Vente_prod getVenteProdById(Long id) {
        return venteProdRepository.findById(id).orElse(null);
    }

    public Vente_prod addVenteProd(Vente_prod venteProd) {
        return venteProdRepository.save(venteProd);
    }

    public Vente_prod updateVenteProd(Long id, Vente_prod venteProd) {
        if (venteProdRepository.existsById(id)) {
            venteProd.setId(id);
            return venteProdRepository.save(venteProd);
        }
        return null;
    }

    public void deleteVenteProd(Long id) {
        venteProdRepository.deleteById(id);
    }
    public List<Vente_prod> getVentesProdByInstructor(Long instructor) {
        return venteProdRepository.findByInstructor(instructor);
    }
}
