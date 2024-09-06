package com.example.pfe.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonSubTypes;

@Entity
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "TYPE", length = 4)

public  class Evenement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private String description;
    private boolean fait;
    private Date dateDebut;
    private Date dateFin;
    private String heureDebut;
    private String heureFin;
    private int nbrParticipant;
    private int nbrPlaceDispo;
    private int nbrPlaceRestant;
    private Boolean approuve;

    @ManyToOne
    @JoinColumn(name = "type_evenement_id")
    private Type_evenement typeEvenement;
    @OneToMany(mappedBy = "evenement")
    private List<LigneEvenement> lignesEvenement;

    public Evenement() {
    }

    public Evenement(Long id, String code, String description, boolean fait, Date dateDebut, Date dateFin,
			String heureDebut, String heureFin, int nbrParticipant, int nbrPlaceDispo, int nbrPlaceRestant,
			Type_evenement typeEvenement, List<LigneEvenement> lignesEvenement) {
		super();
		this.id = id;
		this.code = code;
		this.description = description;
		this.fait = fait;
		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
		this.heureDebut = heureDebut;
		this.heureFin = heureFin;
		this.nbrParticipant = nbrParticipant;
		this.nbrPlaceDispo = nbrPlaceDispo;
		this.nbrPlaceRestant = nbrPlaceRestant;
		this.typeEvenement = typeEvenement;
		this.lignesEvenement = lignesEvenement;
	}

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

    public boolean isFait() {
        return fait;
    }

    public void setFait(boolean fait) {
        this.fait = fait;
    }

    public Date getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(Date dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Date getDateFin() {
        return dateFin;
    }

    public void setDateFin(Date dateFin) {
        this.dateFin = dateFin;
    }

    public String getHeureDebut() {
        return heureDebut;
    }

    public void setHeureDebut(String heureDebut) {
        this.heureDebut = heureDebut;
    }

    public String getHeureFin() {
        return heureFin;
    }

    public void setHeureFin(String heureFin) {
        this.heureFin = heureFin;
    }

    public int getNbrParticipant() {
        return nbrParticipant;
    }

    public void setNbrParticipant(int nbrParticipant) {
        this.nbrParticipant = nbrParticipant;
    }

    public int getNbrPlaceDispo() {
        return nbrPlaceDispo;
    }

    public void setNbrPlaceDispo(int nbrPlaceDispo) {
        this.nbrPlaceDispo = nbrPlaceDispo;
    }

    public int getNbrPlaceRestant() {
        return nbrPlaceRestant;
    }

    public void setNbrPlaceRestant(int nbrPlaceRestant) {
        this.nbrPlaceRestant = nbrPlaceRestant;
    }

    public Boolean getApprouve() {
		return approuve;
	}

	public void setApprouve(Boolean approuve) {
		this.approuve = approuve;
	}

	public Type_evenement getTypeEvenement() {
        return typeEvenement;
    }

    public void setTypeEvenement(Type_evenement typeEvenement) {
        this.typeEvenement = typeEvenement;
    }

}
