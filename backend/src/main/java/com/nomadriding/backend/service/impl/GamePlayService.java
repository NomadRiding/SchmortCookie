package com.nomadriding.backend.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference; // Corrected import statement
import com.nomadriding.backend.model.GamePlay;
import com.nomadriding.backend.repository.GamePlayRepository;
import com.nomadriding.backend.service.interfaces.IGamePlayService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Import for Transactional

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

@Service
public class GamePlayService implements IGamePlayService {
    @Autowired
    private GamePlayRepository gamePlayRepository;

    private List<Map<String, Object>> questions;


    @PostConstruct
    public void init() throws IOException {
        final ObjectMapper mapper = new ObjectMapper();
        final TypeReference<List<Map<String, Object>>> typeReference = new TypeReference<List<Map<String, Object>>>() {};
        final InputStream inputStream = getClass().getResourceAsStream("/trivia.json");

        if (inputStream == null) {
            throw new IOException("Resource not found: /trivia.json");
        }

        this.questions = mapper.readValue(inputStream, typeReference);
    }

    public List<Map<String, Object>> getAllQuestions() {
        return questions;
    }

    @Override
    @Transactional(readOnly = true)
    public List<GamePlay> getAllGamePlay() {
        return gamePlayRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public GamePlay getGamePlayById(Integer id) {
        return gamePlayRepository.findById(id).orElse(null);
    }
}