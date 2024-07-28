package com.nomadriding.backend.repository;

import com.nomadriding.backend.model.Questions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionsRepository extends JpaRepository<Questions, Integer> {
}
