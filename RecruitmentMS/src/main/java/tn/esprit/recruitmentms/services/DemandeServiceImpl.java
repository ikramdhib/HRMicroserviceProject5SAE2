package tn.esprit.recruitmentms.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.recruitmentms.entities.Demande;
import tn.esprit.recruitmentms.entities.Etat;
import tn.esprit.recruitmentms.entities.JobOffer;
import tn.esprit.recruitmentms.entities.Status;
import tn.esprit.recruitmentms.exceptions.ResourceNotFoundException;
import tn.esprit.recruitmentms.repositories.IDemandeRepository;
import tn.esprit.recruitmentms.repositories.IJobOfferRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor

public class DemandeServiceImpl implements IDemandeService{
    private IDemandeRepository iDemandeRepository;
    private IJobOfferRepository iJobOfferRepository;

    private final String uploadDir = "C:/Users/Marye/Desktop/upload";
    @Override
    public Demande createDemande(Demande demande, MultipartFile file) throws IOException {
        // Check if the file is present and not empty
        if (file != null && !file.isEmpty()) {
            // Validate file type (ensure it's a PDF)
            if (!file.getContentType().equals("application/pdf")) {
                throw new IllegalArgumentException("Only PDF files are allowed for CV upload.");
            }

            // Create a unique filename to prevent overwriting
            String originalFileName = file.getOriginalFilename();
            String uniqueFileName = System.currentTimeMillis() + "_" + originalFileName;
            Path filePath = Paths.get(uploadDir, uniqueFileName);

            // Create the upload directory if it doesn't exist
            File dir = new File(uploadDir);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            // Save the file to the specified directory
            try {
                Files.copy(file.getInputStream(), filePath);
                // Set the CV path in the Demande entity
                demande.setCvPath(filePath.toString());
            } catch (IOException e) {
                throw new IOException("Failed to save the CV file. Please try again.", e);
            }
        }

        // Set additional default values if needed
        demande.setEtat(Etat.valueOf("RECEIVED"));
        demande.setStatus(Status.valueOf("Nothing"));

        // Save the Demande entity to the repository
        return iDemandeRepository.save(demande);
    }




    public Demande retrieveDemande(Long idDem) {
        return iDemandeRepository.findById(idDem).orElse(null);
    }

    @Override
    public Demande updateDemande(Long idDem, Demande updatedDemande) {
        Optional<Demande> optionalDemande = iDemandeRepository.findById(idDem);
        if (optionalDemande.isPresent()) {
            Demande demande = optionalDemande.get();
            demande.setFullName(updatedDemande.getFullName());
            demande.setEmail(updatedDemande.getEmail());
            demande.setPhone(updatedDemande.getPhone());
            demande.setSkills(updatedDemande.getSkills());
            demande.setNbExp(updatedDemande.getNbExp());
            demande.setEtat(updatedDemande.getEtat());
            demande.setStatus(updatedDemande.getStatus());
            demande.setCvPath(updatedDemande.getCvPath());
            demande.setCoverLetter(updatedDemande.getCoverLetter());
            demande.setJobOffer(updatedDemande.getJobOffer());
            return iDemandeRepository.save(demande);
        } else {
            throw new RuntimeException("Demande not found with id: " + idDem);
        }
    }

    @Override
    public List<Demande> getDemandeByJobId(Long idJob) {
        return iDemandeRepository.findByJobOffer_IdJob(idJob);
    }


    @Override
    public void deleteDemande(Long idDem) {
        if (!iDemandeRepository.existsById(idDem)) {
            throw new ResourceNotFoundException("Demande", idDem);
        }
        iDemandeRepository.deleteById(idDem);
    }

    @Override
    public void filterAndUpdateDemande() {
        List<Demande> demandes = iDemandeRepository.findAll();

        for (Demande demande : demandes) {
            if (demande.getEtat() == Etat.RECEIVED && demande.getStatus() == Status.Nothing) {
                Optional<JobOffer> optionalJobOffer = iJobOfferRepository.findById(demande.getJobOffer().getIdJob());
                if (optionalJobOffer.isPresent()) {
                    JobOffer jobOffer = optionalJobOffer.get();

                    // Vérifier si le nombre d'expériences est différent et inférieur à celui de l'offre d'emploi
                    if (demande.getNbExp() != jobOffer.getNbreExperience().intValue() && (demande.getNbExp() < jobOffer.getNbreExperience().intValue())){
                        demande.setEtat(Etat.REJECTED);
                        demande.setStatus(Status.NOT_HIRED); // Status becomes NotTirer
                    } else {
                        // Comparer les compétences
                        double similarityPercentage = calculateSkillsSimilarity(demande.getSkills(), jobOffer.getCompetence());
                        if (similarityPercentage >= 80.0) {
                            demande.setEtat(Etat.ACCEPTED);
                            demande.setStatus(Status.HIRED); // Status becomes Tirer
                        } else {
                            demande.setEtat(Etat.REJECTED);
                            demande.setStatus(Status.NOT_HIRED); // Status becomes NotTirer
                        }
                    }
                    iDemandeRepository.save(demande); // Sauvegarder les modifications
                }
            }
        }
    }



    private double calculateSkillsSimilarity(String demandeSkills, String jobOfferSkills) {
        // Logique pour comparer les compétences et calculer le pourcentage de similarité
        // Pour une mise en œuvre simple, nous allons utiliser la correspondance des sous-chaînes
        String[] demandeSkillsArray = demandeSkills.split(","); // Suppose que les compétences sont séparées par des virgules
        String[] jobOfferSkillsArray = jobOfferSkills.split(",");

        int matchedSkills = 0;
        for (String demandeSkill : demandeSkillsArray) {
            for (String jobOfferSkill : jobOfferSkillsArray) {
                if (demandeSkill.trim().equalsIgnoreCase(jobOfferSkill.trim())) {
                    matchedSkills++;
                    break;
                }
            }
        }

        // Calculer le pourcentage de similarité
        double totalSkills = demandeSkillsArray.length + jobOfferSkillsArray.length;
        if (totalSkills == 0) return 0.0; // Eviter la division par zéro
        return (matchedSkills / totalSkills) * 100; // Renvoie le pourcentage de similarité
    }

}
