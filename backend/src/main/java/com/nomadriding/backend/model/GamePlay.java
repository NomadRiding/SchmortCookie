package com.nomadriding.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "game_plays")
@Data
@NoArgsConstructor
public class GamePlay implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date playDate;
    private boolean isPaid;
    private int score;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public GamePlay(Date playDate, boolean isPaid, int score, User user) {
        this.playDate = playDate;
        this.isPaid = isPaid;
        this.score = score;
        this.user = user;
    }
}