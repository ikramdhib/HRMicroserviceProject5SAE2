package tn.esprit.com.msgestproject.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;
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
    private int responsableId ;
    @ElementCollection
    private Set<Integer> userIds;
    @ElementCollection
    private List<Utilisateur> members;
    private Utilisateur responsable;
    @OneToMany(mappedBy = "equipe" , cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Projet> projets;

}
