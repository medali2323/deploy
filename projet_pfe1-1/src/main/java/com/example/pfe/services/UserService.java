package com.example.pfe.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.pfe.models.User;
import com.example.pfe.payload.request.ChangePasswordRequest;
import com.example.pfe.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	
	 @Autowired
	    private UserRepository userRepository;
	 @Autowired
 private PasswordEncoder passwordEncoder;

	   public void changePassword(Long userId, ChangePasswordRequest request) throws NotFoundException {
	        User user = userRepository.findById(userId).orElseThrow(NotFoundException::new);

	        // Vérifier si l'ancien mot de passe correspond
	        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
	            throw new IllegalArgumentException("Ancien mot de passe incorrect");
	        }

	        // Hasher le nouveau mot de passe
	        String newPasswordHash = passwordEncoder.encode(request.getNewPassword());
	        user.setPassword(newPasswordHash);
	        userRepository.save(user);
	    }
}
