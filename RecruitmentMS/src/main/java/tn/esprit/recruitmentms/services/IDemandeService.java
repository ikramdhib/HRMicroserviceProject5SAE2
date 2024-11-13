package tn.esprit.recruitmentms.services;

import org.springframework.web.multipart.MultipartFile;
import tn.esprit.recruitmentms.entities.Demande;

import java.io.IOException;
import java.util.List;

public interface IDemandeService {

    Demande createDemande(Demande demande);

    Demande retrieveDemande(Long idDem);

    Demande updateDemande(Long idDem, Demande updatedDemande);
    //liste de demande by job id
    List<Demande> getDemandeByJobId(Long idJob);


    void deleteDemande(Long idDem);


    void filterAndUpdateDemande();




}