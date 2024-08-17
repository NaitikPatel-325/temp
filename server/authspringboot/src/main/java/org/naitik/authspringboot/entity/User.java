package org.naitik.authspringboot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;



@Entity
@Table(name = "user")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {


    @jakarta.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "fullname", unique = true)
    private String fullname;

    @Column(name = "picture")
    private String Picture;

    @Column(name = "email", unique = true)
    private String email;



    public User(String fullname, String email,String picture,Long id) {
        this.fullname = fullname;
        this.email = email;
        this.Picture = picture;
        this.id = id;
    }


}
