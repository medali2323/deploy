package com.example.pfe.security.services;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.beans.factory.annotation.*;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.pfe.models.User;
import com.example.pfe.models.Vente_prod;
import com.example.pfe.payload.request.ChangePasswordRequest;
import com.example.pfe.repository.UserRepository;
import com.example.pfe.repository.Vente_prodRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userRepository;
 
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        return UserDetailsImpl.build(user);
    }
    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        return UserDetailsImpl.build(user);
    }

    public List<User> getallusers() {
        return userRepository.findAll();
    }

    public User getuserbyid(Long id) {
        return userRepository.findById(id).orElse(null);
    }
   
}