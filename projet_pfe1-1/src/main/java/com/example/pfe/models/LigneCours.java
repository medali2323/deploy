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
	    private Cours cours;

	    @ManyToOne
	    private Condidat condidat;
	    
	    
	    private boolean paye;
	    
	    private boolean approuve;
	    
	    
		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

	

		public Cours getCours() {
			return cours;
		}

		public void setCours(Cours cours) {
			this.cours = cours;
		}

		public Condidat getCondidat() {
			return condidat;
		}

		public void setCondidat(Condidat condidat) {
			this.condidat = condidat;
		}

		public boolean isPaye() {
			return paye;
		}

		public void setPaye(boolean paye) {
			this.paye = paye;
		}

		public boolean isApprouve() {
			return approuve;
		}

		public void setApprouve(boolean approuve) {
			this.approuve = approuve;
		}

	
		
	    
}
