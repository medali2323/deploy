package com.example.pfe.models;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Vente_prod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private Date dateVente;
    private double totHt;
    private double totTtc;
    private boolean encaisse;
    @ManyToOne
    @JoinColumn(name = "instructor_id")
    private Instructor instructor;
    @OneToMany(mappedBy = "venteProd")
    private List<Lignevente> lignesVente;
    
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
	public Date getDateVente() {
		return dateVente;
	}
	public void setDateVente(Date dateVente) {
		this.dateVente = dateVente;
	}
	public double getTotHt() {
		return totHt;
	}
	public void setTotHt(double totHt) {
		this.totHt = totHt;
	}
	public double getTotTtc() {
		return totTtc;
	}
	public void setTotTtc(double totTtc) {
		this.totTtc = totTtc;
	}
	
	public boolean isEncaisse() {
		return encaisse;
	}
	public void setEncaisse(boolean encaisse) {
		this.encaisse = encaisse;
	}
	public Instructor getInstructor() {
		return instructor;
	}
	public void setInstructor(Instructor instructor) {
		this.instructor = instructor;
	}
	
	
	
   

  
}
