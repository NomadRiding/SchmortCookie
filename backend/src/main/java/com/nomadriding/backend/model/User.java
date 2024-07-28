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
    private Integer phoneNumber;
    private String password;
    private List<GamePlay> gamePlays = new ArrayList<>();

    @Embedded
    private UserDetails userDetails;
}