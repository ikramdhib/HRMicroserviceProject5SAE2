package tn.esprit.gestionconge.Services;

import tn.esprit.gestionconge.Entities.Conge;

import java.util.List;

public interface IServiceConge {
    public Conge addConge(Conge conge);
    public Conge updateConge(Conge conge);
    public List<Conge> getAllConges();
    public void deleteConge(int congeId);
}
