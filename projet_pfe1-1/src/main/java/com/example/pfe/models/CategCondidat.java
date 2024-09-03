package com.example.pfe.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class CategCondidat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codecatcond;
    private String descriptionarcond;
   @OneToMany(mappedBy = "categCondidat")private List<Condidat> Condidats;
    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodecatcond() {
        return codecatcond;
    }

    public void setCodecatcond(String codecatcond) {
        this.codecatcond = codecatcond;
    }

    public String getdescriptionarcond() {
        return descriptionarcond;
    }

    public void setdescriptionarcond(String descriptionarcond) {
        this.descriptionarcond = descriptionarcond;
    }
}
