package tn.esprit.com.msgestproject.Services;

import tn.esprit.com.msgestproject.Entities.Status;
import tn.esprit.com.msgestproject.Entities.Tache;

import java.util.List;

public interface ITache {

    Tache addTache(Tache tache);

    List<Tache> getAllTaches();

    Tache getOneTache(int id);

    void deleteTache(int id);

    Tache updateTache(Tache tache);

    List<Tache> getTacheWithStatus(Status status);

    List<Tache> getAllById(List<Integer> integers);

    List<Tache> getAllByProjectId(int id);

    List<Tache> getAllTcahesWithUserIdAndProjectId(int userId, int projetId);

    Tache updateStatus(int id , Status status);

}
