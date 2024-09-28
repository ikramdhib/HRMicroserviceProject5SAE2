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
public class Projet implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id ;
    private String titre ;
    private String detailles ;
    @ManyToOne
    private Equipe equipe;
    @OneToMany(mappedBy = "projet" , cascade =  CascadeType.ALL)
    private Set<Tache> taches;
}
