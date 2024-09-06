package com.example.pfe.models;

import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;

@Entity
@PrimaryKeyJoinColumn(name="id")
public class Condidat extends User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String tel2;
    private double mt_affiliation;
    private String code_postal;
    @ManyToOne
    @JoinColumn(name = "categ_condidat_id")
    private CategCondidat categCondidat;
    @ManyToOne
    @JoinColumn(name = "salle_id")
    private SalleDeSport salle_de_sport; 
    @ManyToOne
    @JoinColumn(name = "instructor_id")
    private Instructor instructor;
    
    @OneToMany(mappedBy = "condidat")
    private List<LigneCours> lignesCours;
    @OneToMany(mappedBy = "condidat")
    private List<LigneFormation> LignesFormation;
    
    
    private Set<GrantedAuthority> authorities;
    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

 

	public String getTel2() {
		return tel2;
	}

	public void setTel2(String tel2) {
		this.tel2 = tel2;
	}

	public double getMt_affiliation() {
        return mt_affiliation;
    }

    public void setMt_affiliation(double mt_affiliation) {
        this.mt_affiliation = mt_affiliation;
    }



	public String getCode_postal() {
		return code_postal;
	}

	public void setCode_postal(String code_postal) {
		this.code_postal = code_postal;
	}

	public CategCondidat getCategCondidat() {
		return categCondidat;
	}

	public void setCategCondidat(CategCondidat categCondidat) {
		this.categCondidat = categCondidat;
	}

	public SalleDeSport getSalle_de_sport() {
		return salle_de_sport;
	}

	public void setSalle_de_sport(SalleDeSport salle_de_sport) {
		this.salle_de_sport = salle_de_sport;
	}

	public Instructor getInstructor() {
		return instructor;
	}

	public void setInstructor(Instructor instructor) {
		this.instructor = instructor;
	}
	public void setAuthorities(Set<GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    public Set<GrantedAuthority> getAuthorities() {
        return authorities;
    }
    
}
