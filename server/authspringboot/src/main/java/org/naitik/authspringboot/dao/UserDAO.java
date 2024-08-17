package org.naitik.authspringboot.dao;
import org.naitik.authspringboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserDAO extends JpaRepository<User, Long> {

    public User findByEmail(String email);
    public boolean existsByEmail(String email);
}
