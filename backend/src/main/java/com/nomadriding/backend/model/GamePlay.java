package com.nomadriding.backend.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class GamePlay {
    private Date playDate;
    private boolean isPaid;
    private Integer score;
    private User user;

}