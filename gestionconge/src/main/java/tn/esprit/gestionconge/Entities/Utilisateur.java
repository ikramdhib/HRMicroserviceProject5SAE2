package tn.esprit.gestionconge.Entities;

import lombok.*;

import java.io.Serializable;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Utilisateur implements Serializable {
    private int id ;
    private String username ;
    private String email;
    private String password;
    private String phone ;
    private String cin;
}