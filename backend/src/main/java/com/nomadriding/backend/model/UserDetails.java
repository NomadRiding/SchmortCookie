package com.nomadriding.backend.model;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
public class UserDetails implements Serializable {
    private static final long serialVersionUID = 1L;

    private String email;
    private String firstName;
    private String lastName;
    private String username;
    private String bio;
    private String venmoLink;
    private String cashApp;
    private String zelle;
    private String profileImg;
}