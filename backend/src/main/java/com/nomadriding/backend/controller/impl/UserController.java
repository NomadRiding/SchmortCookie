package com.nomadriding.backend.controller.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nomadriding.backend.model.User;
import com.nomadriding.backend.model.UserDetails;
import com.nomadriding.backend.service.interfaces.IUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private IUserService userService;

    // ************************************ GET ****************************
    @GetMapping("/user")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/user/{id}/profile")
    public ResponseEntity<?> getUserProfile(@PathVariable Integer id) {
        try {
            User user = userService.getUserById(id);
            UserDetails userDetails = user.getUserDetails();

            // Use the default profile image URL if profileImg is not set
            String profileImageUrl = userDetails.getProfileImg();
            userDetails.setProfileImg(profileImageUrl);

            return ResponseEntity.ok(userDetails);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\": \"Error fetching profile: " + e.getMessage() + "\"}");
        }
    }

    // ************************************ POST ****************************
    @PostMapping("/user/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Map<String, String>> saveUser(@RequestBody User user) {
        boolean userExists = userService.existsByPhoneNumber(user.getPhoneNumber());
        if (userExists) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Phone number already registered");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        userService.saveUser(user);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User added successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/user/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody User user) {
        User foundUser = userService.findByPhoneNumberAndPassword(user.getPhoneNumber(), user.getPassword());

        if (foundUser != null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "User logged in successfully");
            response.put("id", foundUser.getId().toString());
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Invalid phone number or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    // ************************************ PUT ****************************
    @PutMapping("/user/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateUser(@RequestBody @Valid User user, @PathVariable Integer id) {
        userService.updateUser(user, id);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/user/{id}/profile")
    public ResponseEntity<?> updateUserProfile(
            @PathVariable Integer id,
            @RequestPart("profileImg") MultipartFile profileImg,
            @RequestPart("userDetails") String userDetailsJson) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            UserDetails userDetails = mapper.readValue(userDetailsJson, UserDetails.class);

            // Process the profile image and user details
            String profileImageUrl = userService.updateUserProfile(id, profileImg, userDetails);

            // Return the updated profile image URL as part of the response
            return ResponseEntity.ok("{\"profileImageUrl\": \"" + profileImageUrl + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\": \"Error updating profile: " + e.getMessage() + "\"}");
        }
    }

    // ************************************ DELETE ****************************
    @DeleteMapping("/user/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
    }
}