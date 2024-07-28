package com.nomadriding.backend.repository;

import com.nomadriding.backend.model.Rewards;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RewardsRepository extends JpaRepository<Rewards, Integer> {
}
