package com.example.pfe.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pfe.models.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
}