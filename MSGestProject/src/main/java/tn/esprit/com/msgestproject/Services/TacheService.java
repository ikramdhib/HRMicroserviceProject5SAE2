package tn.esprit.com.msgestproject.Services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.com.msgestproject.Entities.Status;
import tn.esprit.com.msgestproject.Entities.Tache;
import tn.esprit.com.msgestproject.Repsitories.TacheRepository;

import java.util.List;
@AllArgsConstructor
@Service
public class TacheService implements ITache {
    private TacheRepository tacheRepository;
    @Override
    public Tache addTache(Tache tache) {
        return tacheRepository.save(tache);
    }

    @Override
    public List<Tache> getAllTaches() {
        return tacheRepository.findAll();
    }

    @Override
    public Tache getOneTache(int id) {
        return tacheRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteTache(int id) {
        tacheRepository.deleteById(id);
    }

    @Override
    public Tache updateTache(Tache tache) {
        return tacheRepository.save(tache);
    }

    @Override
    public List<Tache> getTacheWithStatus(Status status) {
        return tacheRepository.findByStatusLike(status);
    }

    @Override
    public List<Tache> getAllById(List<Integer> integers) {
        return tacheRepository.findAllById(integers);
    }

    @Override
    public List<Tache> getAllByProjectId(int id) {
        return tacheRepository.findByProjetId(id);
    }

    @Override
    public List<Tache> getAllTcahesWithUserIdAndProjectId(int userId, int projetId) {
        return tacheRepository.findByUser_IdAndProjet_Id(userId,projetId);
    }

    @Override
    public Tache updateStatus(int id, Status status) {
        Tache tache = tacheRepository.findById(id).orElse(null);
        tache.setStatus(status);
        return tacheRepository.save(tache);
    }
}
