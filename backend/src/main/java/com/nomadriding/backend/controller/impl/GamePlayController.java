package com.nomadriding.backend.controller.impl;


import com.nomadriding.backend.model.GamePlay;
import com.nomadriding.backend.service.interfaces.IGamePlayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class GamePlayController implements IGamePlayService {

    @Autowired
    private IGamePlayService gamePlayService;


    // **************************************** GET *********************

    @GetMapping("/gameplay")
    public List<GamePlay> getAllGamePlay(){
        return gamePlayService.getAllGamePlay();
    }

    @GetMapping("/gameplay/{id}")
    @ResponseStatus(HttpStatus.OK)
    public GamePlay getGamePlayById(@PathVariable Integer id){
        return gamePlayService.getGamePlayById(id);
    }
}
