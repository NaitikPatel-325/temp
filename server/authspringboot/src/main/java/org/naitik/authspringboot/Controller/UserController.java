package org.naitik.authspringboot.Controller;

import org.naitik.authspringboot.entity.User;
import org.naitik.authspringboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173/")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String home() {
        return "Hello, Home!";
    }

    @GetMapping("/user")
    public User getUser(@AuthenticationPrincipal OAuth2User oauth2User) {
        if(oauth2User == null) {
            return null;
        }
        User user = userService.findUserByEmail(oauth2User.getAttribute("email")).orElse(null);
        System.out.println("user: " + user);
        System.out.println("inside user controller");
        return user;
    }


    @GetMapping("/secured")
    public String secured(@AuthenticationPrincipal OAuth2User oauth2User) {

        String username = "Unknown User";

        System.out.println("principal: " + oauth2User);

        return "Hello, Secured! Logged in as: " + oauth2User.getAttribute("email");
    }

}
