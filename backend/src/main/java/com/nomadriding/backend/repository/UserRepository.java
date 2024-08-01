package com.nomadriding.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nomadriding.backend.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByPhoneNumberAndPassword(String phoneNumber, String password);
    boolean existsByPhoneNumber(String phoneNumber);
}
