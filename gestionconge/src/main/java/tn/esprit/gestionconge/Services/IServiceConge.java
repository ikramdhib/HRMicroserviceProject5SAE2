package tn.esprit.gestionconge.Services;

import tn.esprit.gestionconge.Entities.Conge;
import tn.esprit.gestionconge.Entities.Status;

import java.util.List;

public interface IServiceConge {
    public Conge addConge(Conge conge , int id);
    public Conge updateConge(Conge conge);
    public List<Conge> getAllConges();
    public void deleteConge(int congeId);
    public Conge updateStatusConge(int congeId, Status statut);
}
