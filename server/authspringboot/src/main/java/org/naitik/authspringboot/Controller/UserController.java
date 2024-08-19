package org.naitik.authspringboot.Controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.naitik.authspringboot.entity.User;
import org.naitik.authspringboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;



    @GetMapping("/user")
    public User getUser(@AuthenticationPrincipal OAuth2User oauth2User) {
        if (oauth2User == null) {
            return null;
        }
        User user = userService.findUserByEmail(oauth2User.getAttribute("email")).orElse(null);
        System.out.println("user: " + user);
        System.out.println("inside user controller");
        return user;
    }

//    @PostMapping("/logout")
//    public void customLogout(HttpServletRequest request, HttpServletResponse response) throws IOException {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        if (auth != null && auth.isAuthenticated()) {
//            request.getSession().invalidate();
//            response.addCookie(new jakarta.servlet.http.Cookie("JSESSIONID", null));
//            System.out.println("Logged out");
//            response.sendRedirect("http://localhost:5173/");
//        } else {
//            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "User not authenticated");
//        }
//    }

    @GetMapping("/secured")
    public String secured(@AuthenticationPrincipal OAuth2User oauth2User) {
        if (oauth2User == null) {
            return "Unauthorized";
        }
        String email = oauth2User.getAttribute("email");
        System.out.println("principal: " + oauth2User);
        return "Hello, Secured! Logged in as: " + email;
    }
}
