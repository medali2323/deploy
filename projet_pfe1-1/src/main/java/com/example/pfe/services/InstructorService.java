package com.example.pfe.services;

import com.example.pfe.models.Instructor;
import com.example.pfe.repository.InstructorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class InstructorService {
    @Autowired
    private InstructorRepository instructorRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public List<Instructor> getAllInstructors() {
        return instructorRepository.findAll();
    }

    public Instructor getInstructorById(Long id) {
        return instructorRepository.findById(id).orElse(null);
    }

    public Instructor addInstructor(Instructor instructor) {
    	  String encodedPassword = passwordEncoder.encode(instructor.getPassword());
    	  instructor.setPassword(encodedPassword);
    	  instructor.setAuthorities(Collections.singleton(new SimpleGrantedAuthority("ROLE_INSTRUCTOR")));

        return instructorRepository.save(instructor);
    }

    public Instructor updateInstructor(Long id, Instructor instructor) {
        Optional<Instructor> optionalInstructor = instructorRepository.findById(id);
        if (optionalInstructor.isPresent()) {
            Instructor existingInstructor = optionalInstructor.get();
            existingInstructor.setAuthorities(instructor.getAuthorities() != null ? instructor.getAuthorities() : existingInstructor.getAuthorities());
            return instructorRepository.save(existingInstructor);
        }
        return null;
    }

    public void deleteInstructor(Long id) {
        instructorRepository.deleteById(id);
    }
}
