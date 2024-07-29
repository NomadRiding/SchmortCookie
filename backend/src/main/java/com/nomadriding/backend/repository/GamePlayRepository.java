package com.nomadriding.backend.repository;

import com.nomadriding.backend.model.GamePlay;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GamePlayRepository extends JpaRepository<GamePlay, Integer> {
}
