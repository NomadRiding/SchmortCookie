package com.nomadriding.backend.controller.impl;

import com.nomadriding.backend.model.User;
import com.nomadriding.backend.model.UserDetails;
import com.nomadriding.backend.service.interfaces.IUserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IUserService userService;

    @Test
    void getAllUsers() throws Exception {
        User user1 = new User("7854567511", "cookies");
        User user2 = new User("4521875611", "monster");
        List<User> users = Arrays.asList(user1, user2);

        given(userService.getAllUsers()).willReturn(users);

        mockMvc.perform(get("/api/users")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].phoneNumber").value("7854567511"))
                .andExpect(jsonPath("$[1].phoneNumber").value("4521875611"));
    }

    @Test
    void saveUser() throws Exception {
        User newUser = new User("4564874585", "apply");

        given(userService.saveUser(Mockito.any(User.class))).willReturn(newUser);

        String newUserJson = "{\"phoneNumber\": \"4564874585\", \"password\": \"apply\", \"isLoggedOn\": false}";

        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newUserJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.phoneNumber").value("4564874585"))
                .andExpect(jsonPath("$.password").value("apply"));
    }

    @Test
    void updateUser() throws Exception {
        User updatedUser = new User("4564874585", "apple");
        updatedUser.setId(1);

        doNothing().when(userService).updateUser(Mockito.any(User.class), Mockito.anyInt());

        String updatedUserJson = "{\"phoneNumber\": \"4564874585\", \"password\": \"apple\", \"isLoggedOn\": true}";

        mockMvc.perform(put("/api/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedUserJson))
                .andExpect(status().isNoContent());
    }

    @Test
    void deleteUser() throws Exception {
        doNothing().when(userService).deleteUser(1);

        mockMvc.perform(delete("/api/users/1")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }
}