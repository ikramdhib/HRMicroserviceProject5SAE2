export interface Contenu {
    id: number;
    titre: string;
    type: string; // ex: "video", "pdf", "texte"
    url?: string;
    filePath?: string; // Chemin du fichier, optionnel
    ordre: number;
    sectionId: number;
  }