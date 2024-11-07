package tn.esprit.com.msgestproject.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Set;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Tache implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id ;
    private String titre ;
    private String detail ;
    @Enumerated(EnumType.STRING)
    private Status status ;
    private int userId;
    @ManyToOne
    private Projet projet;
    private Utilisateur utilisateur;

}
