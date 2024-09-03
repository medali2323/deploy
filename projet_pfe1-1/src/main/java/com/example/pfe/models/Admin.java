package com.example.pfe.models;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "admins")
@PrimaryKeyJoinColumn(name="user_id")

public class Admin  extends User{
	 private Set<GrantedAuthority> authorities;

	    public void setAuthorities(Set<GrantedAuthority> authorities) {
	        this.authorities = authorities;
	    }

	    public Set<GrantedAuthority> getAuthorities() {
	        return authorities;
	    }
}
