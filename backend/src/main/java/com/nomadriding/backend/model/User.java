package com.nomadriding.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String phoneNumber;
    private String password;
    private boolean isLoggedOn;
    private List<GamePlay> gamePlays = new ArrayList<>();

    @Embedded
    private UserDetails userDetails;

    public User(String phoneNumber, String password) {
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.isLoggedOn = false; // Default to false
        this.userDetails = null; // Initialize as null or set via a setter
        this.gamePlays = new ArrayList<>();
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", password='" + password + '\'' +
                ", isLoggedOn=" + isLoggedOn +
                ", gamePlays=" + gamePlays +
                ", userDetails=" + userDetails +
                '}';
    }
}