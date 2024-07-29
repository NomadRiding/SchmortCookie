package com.nomadriding.backend.service.interfaces;

import com.nomadriding.backend.model.GamePlay;

import java.util.List;

public interface IGamePlayService {
    List<GamePlay> getAllGamePlay();
    GamePlay getGamePlayById(Integer id);
}
