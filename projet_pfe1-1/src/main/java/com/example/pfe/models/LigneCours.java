package com.example.pfe.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class LigneCours {
	  @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @ManyToOne
	    @JoinColumn(name = "cours_id")
	    private Cours Cours;

	    @ManyToOne
	    private Condidat condidat;

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public Cours getCours() {
			return Cours;
		}

		public void setCours(Cours Cours) {
			this.Cours = Cours;
		}

		public Condidat getCondidat() {
			return condidat;
		}

		public void setCondidat(Condidat condidat) {
			this.condidat = condidat;
		}

	
		
	    
}
