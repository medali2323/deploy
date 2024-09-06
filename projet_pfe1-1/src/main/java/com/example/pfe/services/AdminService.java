package com.example.pfe.services;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.pfe.models.Admin;
import com.example.pfe.models.Instructor;
import com.example.pfe.models.Admin;
import com.example.pfe.repository.AdminRepository;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    // Méthodes CRUD
    public Admin saveAdmin(Admin admin) {
    	String encodedPassword = passwordEncoder.encode(admin.getPassword());
        admin.setPassword(encodedPassword);
        admin.setAuthorities(Collections.singleton(new SimpleGrantedAuthority("ROLE_ADMIN")));

        return adminRepository.save(admin);
    }

    public Admin getAdminById(Long id) {
        return adminRepository.findById(id).orElse(null);
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }
    public Admin updateAdmin(Long id, Admin admin) {
        Optional<Admin> optionalInstructor = adminRepository.findById(id);
        if (optionalInstructor.isPresent()) {
            Admin existingInstructor = optionalInstructor.get();
            existingInstructor.setAuthorities(admin.getAuthorities() != null ? admin.getAuthorities() : existingInstructor.getAuthorities());
            return adminRepository.save(existingInstructor);
        }
        return null;
   
    }
    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }
}
