package tn.esprit.com.msgestproject.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Equipe implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private int id ;
    private String titre ;
    @ManyToOne // changer a onetomany
    private Utilisateur responsable ;
    @ManyToMany
    private Set<Utilisateur> users ;
    @OneToMany(mappedBy = "equipe" , cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Projet> projets;

}
