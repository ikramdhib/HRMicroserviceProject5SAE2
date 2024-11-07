package tn.esprit.com.msgestproject.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
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
    private Date dateDebut ;
    private Date dateFin;
    private Utilisateur responsable;
    @ManyToOne
    private Equipe equipe;
    @OneToMany(mappedBy = "projet" , cascade =  CascadeType.ALL)
    @JsonIgnore
    private Set<Tache> taches;
}
