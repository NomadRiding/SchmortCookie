package com.nomadriding.backend.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Questions {
    private String questionText;
    private String correctAnswer;
    private List<String> incorrectAnswers;
}
