package com.example.pfe.services;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.pfe.models.Admin;
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
    public Admin updateadmin(Long id, Admin admin) {
        if (adminRepository.existsById(id)) {
            admin.setId(id);
            return adminRepository.save(admin);
        }
        return null;
    }
    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }
}
