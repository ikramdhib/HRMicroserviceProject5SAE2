package com.esprit.microservice.msgestiondept.Entities;


import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Utilisateur {
    private int id ;
    private String username ;
    private String email;
    private String password;
    private String phone ;
    private String cin;
}
