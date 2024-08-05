package com.nomadriding.backend.controller.impl;

import com.nomadriding.backend.model.User;
import com.nomadriding.backend.model.UserDetails;
import com.nomadriding.backend.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    IUserService userService;

    // ************************************ GET ****************************
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Integer id) {
        return userService.getUserById(id);
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

        if(foundUser != null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "User logged in successfully");
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
    public void updateUser(@RequestBody @Valid User user, @PathVariable Integer id){
        userService.updateUser(user, id);
    }

    @PutMapping("/user/{id}/profile")
    public ResponseEntity<Map<String, String>> updateUserProfile(@PathVariable Integer id, @RequestBody UserDetails userDetails) {
        userService.updateUserProfile(id, userDetails);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Profile updated successfully");
        return ResponseEntity.ok(response);
    }


    // ************************************ DELETE ****************************

    @DeleteMapping("/user/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Integer id){
        userService.deleteUser(id);
    }


}