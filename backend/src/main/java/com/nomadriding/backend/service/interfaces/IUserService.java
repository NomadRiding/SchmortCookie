package com.nomadriding.backend.service.interfaces;

import com.nomadriding.backend.model.User;
import com.nomadriding.backend.model.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IUserService {
    List<User> getAllUsers();
    User getUserById(Integer id);
    User saveUser(User user);
    void updateUser(User user, Integer id);
    void deleteUser(Integer id);
    User findByPhoneNumberAndPassword(String phoneNumber, String password);
    boolean existsByPhoneNumber(String phoneNumber);
    void updateUserProfile(Integer id, UserDetails userDetails);
    

}
