package com.example.pfe.models;

import jakarta.persistence.*;

import java.sql.Date;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;

@Entity
@Table(name = "instructors")
@PrimaryKeyJoinColumn(name="user_id")

public class Instructor extends User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String profession;
    private String commentaire;
    private String sexe;
    private Date dateNaissance;
    private String filename;
    private String cin;
    @ManyToOne @JoinColumn(name = "pays_id") private Pays pays;
    @ManyToOne  @JoinColumn(name = "Categ_Instructeur_id")private Categ_Instructeur categInstructeur;
    @OneToMany(mappedBy = "instructor")private List<Vente_prod> Vente_prods;

   @OneToMany(mappedBy = "instructor", fetch = FetchType.LAZY)private List<Vente_abonnement> venteAbonnements;
   @OneToMany(mappedBy = "instructor")
   private List<Condidat> condidats;

   @OneToMany(mappedBy = "instructor")
   private List<Formation> Formation;
   
   @OneToMany(mappedBy = "instructor")
   private List<Cours> Cours;
   
   @OneToMany(mappedBy = "instructor")
   private List<LigneEvenement> lignesEvenement;
   
   @OneToOne
   private Compte compte;
   private Set<GrantedAuthority> authorities;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public String getSexe() {
        return sexe;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public Date getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(Date dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String  getfilename() {
        return filename;
    }

    public void setfilename(String filename) {
        this.filename = filename;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public Pays getPays() {
		return pays;
	}

	public void setPays(Pays pays) {
		this.pays = pays;
	}

	public Categ_Instructeur getCategInstructeur() {
		return categInstructeur;
	}

	public void setCategInstructeur(Categ_Instructeur categInstructeur) {
		this.categInstructeur = categInstructeur;
	}


	
	public Compte getCompte() {
		return compte;
	}

	public void setCompte(Compte compte) {
		this.compte = compte;
	}

	public void setAuthorities(Set<GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    public Set<GrantedAuthority> getAuthorities() {
        return authorities;
    }
}
