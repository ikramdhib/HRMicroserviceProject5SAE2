// src/app/models/job-offer.model.ts
export interface JobOffer {
    idJob: number;        // Changed from id to idJob
    title: string;
    description: string;
    competence: string;   // New field for competence
    nbreExperience: number; // Renamed from experience to nbreExperience
    dateFin: Date;        // Renamed from endDate to dateFin
    salary: number;
}
