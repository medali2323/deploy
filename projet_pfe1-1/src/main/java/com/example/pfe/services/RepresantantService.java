package com.example.pfe.services;

import com.example.pfe.models.Represantant;
import com.example.pfe.repository.RepresantantRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class RepresantantService {
    @Autowired
    private RepresantantRepository represantantRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public List<Represantant> getAllRepresantants() {
        return represantantRepository.findAll();
    }

    public Represantant getRepresantantById(Long id) {
        return represantantRepository.findById(id).orElse(null);
    }

    public Represantant addRepresantant(Represantant represantant) {
    	  String encodedPassword = passwordEncoder.encode(represantant.getPassword());
    	  represantant.setPassword(encodedPassword);
    	  represantant.setAuthorities(Collections.singleton(new SimpleGrantedAuthority("ROLE_Represantant")));

        return represantantRepository.save(represantant);
    }

    public Represantant updateRepresantant(Long id, Represantant represantant) {
        if (represantantRepository.existsById(id)) {
            represantant.setId(id);
            return represantantRepository.save(represantant);
        }
        return null;
    }

    public void deleteRepresantant(Long id) {
        represantantRepository.deleteById(id);
    }
}
