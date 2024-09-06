package com.example.pfe.controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.Admin;
import com.example.pfe.models.Categ_abonnement;
import com.example.pfe.services.AdminService;

@RestController
@RequestMapping("/api/admins")
@PreAuthorize("hasRole('ADMIN')")

public class AdminController {
    @Autowired
    private AdminService adminService;

    @PostMapping
    public Admin createAdmin(@RequestBody Admin admin) {
        return adminService.saveAdmin(admin);
    }

    @GetMapping("/{id}")
    public Admin getAdmin(@PathVariable Long id) {
        return adminService.getAdminById(id);
    }

    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }
    @PutMapping("/{id}")
    public ResponseEntity<Admin> updateCategAbonnement(@PathVariable Long id, @RequestBody Admin admin) {
        Admin ad = adminService.updateAdmin(id, admin);
        return ad != null ?
                new ResponseEntity<>(ad, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @DeleteMapping("/{id}")
    public void deleteAdmin(@PathVariable Long id) {
        adminService.deleteAdmin(id);
    }
}
