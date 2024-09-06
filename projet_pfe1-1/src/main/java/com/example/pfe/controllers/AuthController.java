package com.example.pfe.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.pfe.models.Admin;
import com.example.pfe.models.Condidat;
import com.example.pfe.models.ERole;
import com.example.pfe.models.Role;
import com.example.pfe.models.User;
import com.example.pfe.models.User;
import com.example.pfe.payload.request.ChangePasswordRequest;
import com.example.pfe.payload.request.LoginRequest;
import com.example.pfe.payload.request.SignupRequest;
import com.example.pfe.payload.response.JwtResponse;
import com.example.pfe.payload.response.MessageResponse;
import com.example.pfe.repository.*;
import com.example.pfe.security.jwt.JwtUtils;
import com.example.pfe.security.services.UserDetailsImpl;
import com.example.pfe.security.services.UserDetailsServiceImpl;
import com.example.pfe.services.AdminService;
import com.example.pfe.services.CondidatService;
import com.example.pfe.services.UserService;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")


public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;
    @Autowired
      UserService userService;
    @Autowired
    private CondidatService CondidatService;
    
    @PostMapping("/registerCondidat")
    public ResponseEntity<Condidat> addCondidat(@RequestBody Condidat Condidat) {
        Condidat newCondidat = CondidatService.addCondidat(Condidat);
        return new ResponseEntity<>(newCondidat, HttpStatus.CREATED);
    }
    @Autowired
    private AdminService adminService;
    @PostMapping("addadmin")
    public Admin createAdmin(@RequestBody Admin admin) {
        return adminService.saveAdmin(admin);
    }
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }
   

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new MessageResponse("You've been signed out!"));
    }
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> Users = userRepository.findAll();
        return new ResponseEntity<>(Users, HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
    	User User = userRepository.getById(id);
        return User != null ?
                new ResponseEntity<>(User, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteCategAbonnement(@PathVariable Long id) {
    	userRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PutMapping("/{userId}/change-password")
    public ResponseEntity<String> changePassword(@PathVariable Long userId, @RequestBody ChangePasswordRequest request) throws Exception {
    	System.out.println("aaaaaaaaaaaaa");

    	System.out.println(userId);
        userService.changePassword(userId, request);
        return ResponseEntity.ok("Password changed successfully");
    }
	
	
}