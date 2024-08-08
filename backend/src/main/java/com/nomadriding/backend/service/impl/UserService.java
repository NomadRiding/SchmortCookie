package com.nomadriding.backend.service.impl;

import com.nomadriding.backend.model.User;
import com.nomadriding.backend.model.UserDetails;
import com.nomadriding.backend.repository.UserRepository;
import com.nomadriding.backend.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import static java.lang.Integer.parseInt;

@Service
public class UserService implements IUserService {

    private static final String BASE_URL = "http://localhost:8080/uploads/";
    private static final String UPLOAD_DIRECTORY = "C:/Users/fundo/AppData/Local/Temp/uploads/";


    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Integer id) {
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    public UserDetails getUserDetails(Integer id) {
        // Implement logic to fetch user details from the repository
        // Assuming UserDetails has a field for profileImageUrl
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        return user.getUserDetails(); // Adjust as per your data model
    }


    @Override
    public String updateUserProfile(Integer id, MultipartFile profileImg, UserDetails userDetails) throws IOException {
        String profileImageUrl = null;

        if (profileImg != null && !profileImg.isEmpty()) {
            // Ensure the upload directory exists
            Files.createDirectories(Paths.get(UPLOAD_DIRECTORY));

            // Save the file to the server
            String filename = id + "_" + profileImg.getOriginalFilename();
            File file = new File(UPLOAD_DIRECTORY + filename);
            profileImg.transferTo(file);

            // Generate the URL to the saved image
            profileImageUrl = BASE_URL + filename;

            // Set the new profile image URL in the user details
            userDetails.setProfileImg(profileImageUrl);
        }

        // Perform any additional user profile updates (e.g., saving user details)
        User user = getUserById(id);
        user.setUserDetails(userDetails);
        user = userRepository.save(user);

        // Return the URL to the uploaded image, or null if none was uploaded
        return profileImageUrl;
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public boolean existsByPhoneNumber(String phoneNumber) {
        return userRepository.existsByPhoneNumber(phoneNumber);
    }

    @Override
    public void updateUserProfile(Integer id, UserDetails userDetails) {

    }

    @Override
    public User findUserById(String id) {
        // This method needs implementation if it's part of the IUserService interface
        // You can change this depending on your actual requirements
        return userRepository.findById(parseInt(id)).orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    @Override
    public User findByPhoneNumberAndPassword(String phoneNumber, String password) {
        User user = userRepository.findByPhoneNumberAndPassword(phoneNumber, password);
        if (user == null) {
            throw new EntityNotFoundException("Invalid phone number or password");
        }
        return user;
    }

    @Override
    public void updateUser(User user, Integer id) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));

        existingUser.setPhoneNumber(user.getPhoneNumber());
        existingUser.setPassword(user.getPassword());

        userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }
}