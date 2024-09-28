package tn.esprit.com.msgestproject.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

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
    @OneToOne
    private Utilisateur user;
    @ManyToOne
    private Projet projet;

}
