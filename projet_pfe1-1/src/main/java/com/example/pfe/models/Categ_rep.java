package com.example.pfe.models;

import java.util.List;



import jakarta.persistence.Entity;
import jakarta.persistence.*;

@Entity
@Table(name = "categ_rep")
public class Categ_rep {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;
    private String description;

    @OneToMany(mappedBy = "categRep")
    private List<Represantant> representants;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

  
}