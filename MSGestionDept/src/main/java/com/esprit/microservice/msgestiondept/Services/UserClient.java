package com.esprit.microservice.msgestiondept.Services;


import com.esprit.microservice.msgestiondept.Entities.Utilisateur;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "MSExpressService")
public interface UserClient {

    @GetMapping("/users/getUser/{id}")
    Utilisateur getUserById(@PathVariable("id") int id);

    @GetMapping("/users/getAll")
    List<Utilisateur> getAllUsers();

    @PostMapping("/users/addUser")
    Utilisateur addUser(@RequestBody Utilisateur utilisateur);

}
