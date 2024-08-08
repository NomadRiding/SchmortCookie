package com.nomadriding.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    private String phoneNumber;

    private String password;
    private boolean isLoggedOn;

    @Embedded
    private UserDetails userDetails;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GamePlay> gamePlays;

    private boolean loggedOn;

//    public User(String phoneNumber, String password) {
//        this.phoneNumber = phoneNumber;
//        this.password = password;
//        this.isLoggedOn = false;
//    }

}