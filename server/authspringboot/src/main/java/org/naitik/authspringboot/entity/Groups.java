//package org.naitik.authspringboot.entity;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import jakarta.persistence.*;
//
//import java.util.List;
//
//@Entity
//@lombok.Data
//@Table(name = "groups")
//public class Groups {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int id;
//
//    @Column(name = "group_name")
//    private String groupName;
//
//    @Column(name = "currency")
//    private String Currency;
//
//    @JsonIgnore
//    @ManyToMany(mappedBy = "groups",fetch = FetchType.LAZY)
//    private List<User> users;
//
//
//}
