package com.nomadriding.backend.service.interfaces;

import com.nomadriding.backend.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IUserService {
    List<User> getAllUsers();
    User getUserById(Integer id);
    User saveUser(User user);


}
