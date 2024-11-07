package tn.esprit.com.msgestproject.Services;

import tn.esprit.com.msgestproject.Entities.Projet;

import java.util.List;

public interface IProjet {
    Projet saveProjet(Projet projet);
    Projet getprojetById(int id);

    List<Projet> getAllProjets();

    Projet updateProjet(Projet projet);

    void deleteProjet(int id);
     List<Projet> getProjetsByUserId(int userId);
}
