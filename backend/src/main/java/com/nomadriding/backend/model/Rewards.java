package com.nomadriding.backend.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Rewards {
    private String rewardType;
    private String rewardDescription;
    private List<GamePlay> gamePlays = new ArrayList<>();
}
