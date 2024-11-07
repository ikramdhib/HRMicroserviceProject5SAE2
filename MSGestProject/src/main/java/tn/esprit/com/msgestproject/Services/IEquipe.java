package tn.esprit.com.msgestproject.Services;

import tn.esprit.com.msgestproject.Entities.Equipe;

import java.util.List;

public interface IEquipe {

     Equipe addEquipe (Equipe equipe);

     Equipe updateEquipe(Equipe equipe);

     void deleteEquipe(int id) ;

     List<Equipe> getAllEquipes();

     Equipe getOneById(int id );

     List<Equipe> getEquipesByUserId(int userId);
}