package tn.esprit.com.msgestproject.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
