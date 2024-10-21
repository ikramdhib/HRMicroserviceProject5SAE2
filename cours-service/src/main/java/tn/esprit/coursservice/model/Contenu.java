package tn.esprit.coursservice.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Contenu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;
    private String type; // ex: "video", "pdf", "texte"
    private String url; // URL du contenu, optionnel
    private String filePath; // Chemin du fichier, optionnel
    private Integer ordre;
    private Long sectionId;
}
