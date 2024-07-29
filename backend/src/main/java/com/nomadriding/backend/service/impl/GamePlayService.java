package com.nomadriding.backend.service.impl;

import com.nomadriding.backend.model.GamePlay;
import com.nomadriding.backend.repository.GamePlayRepository;
import com.nomadriding.backend.service.interfaces.IGamePlayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GamePlayService implements IGamePlayService {

    @Autowired
    private GamePlayRepository gamePlayRepository;

    @Override
    public List<GamePlay> getAllGamePlay() {
        return gamePlayRepository.findAll();
    }

    @Override
    public GamePlay getGamePlayById(Integer id) {
        return gamePlayRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("GamePlay not found with id: " + id));
    }

}
