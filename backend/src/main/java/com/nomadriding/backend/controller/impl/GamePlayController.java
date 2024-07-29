package com.nomadriding.backend.controller.impl;


import com.nomadriding.backend.model.GamePlay;
import com.nomadriding.backend.service.impl.GamePlayService;
import com.nomadriding.backend.service.interfaces.IGamePlayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class GamePlayController implements IGamePlayService {


    private final GamePlayService gamePlayService;

    public GamePlayController(GamePlayService gamePlayService){
        this.gamePlayService = gamePlayService;
    }

    @CrossOrigin(origins = "http://localhost:5173") // Adjust as necessary
    @GetMapping("/questions")
    public List<Map<String, Object>> getQuestions(){
        return gamePlayService.getAllQuestions();
    }


    @Override
    public List<GamePlay> getAllGamePlay() {
        return gamePlayService.getAllGamePlay();
    }

    @Override
    public GamePlay getGamePlayById(Integer id) {
        return gamePlayService.getGamePlayById(id);
    }
}
