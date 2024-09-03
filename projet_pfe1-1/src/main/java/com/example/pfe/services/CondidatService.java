package com.example.pfe.services;

import com.example.pfe.models.Condidat;
import com.example.pfe.repository.CondidatRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CondidatService {
    @Autowired
    private CondidatRepository condidatRepository;

    public List<Condidat> getAllCondidats() {
        return condidatRepository.findAll();
    }

    public Condidat getCondidatById(Long id) {
        return condidatRepository.findById(id).orElse(null);
    }

    public Condidat addCondidat(Condidat condidat) {
        return condidatRepository.save(condidat);
    }

    public Condidat updateCondidat(Long id, Condidat condidat) {
        if (condidatRepository.existsById(id)) {
            condidat.setId(id);
            return condidatRepository.save(condidat);
        }
        return null;
    }

    public void deleteCondidat(Long id) {
        condidatRepository.deleteById(id);
    }
    public List<Condidat> getCondidatsByInstructor(Long i) {
        return condidatRepository.findByInstructorId(i);
    }
}
