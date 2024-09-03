package com.example.pfe.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class LigneFormation {
	  @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @ManyToOne
	    @JoinColumn(name = "formation_id")
	    private Formation formation;

	    @ManyToOne
	    @JoinColumn(name = "condidat_id")
	    private Condidat condidat;
	    
	    private boolean paye;
	    
	    private boolean approuve;
	    
		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public Formation getFormation() {
			return formation;
		}

		public void setFormation(Formation formation) {
			this.formation = formation;
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
