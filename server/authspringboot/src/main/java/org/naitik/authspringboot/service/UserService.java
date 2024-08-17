package org.naitik.authspringboot.service;

import org.naitik.authspringboot.dao.UserDAO;
import org.naitik.authspringboot.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserService {
    @Autowired
    private UserDAO userDAO;

    public User saveUser(User user) {
        return userDAO.save(user);
    }

    public Optional<User> findUserByEmail(String email) {
        return Optional.ofNullable(userDAO.findByEmail(email));
    }

}
