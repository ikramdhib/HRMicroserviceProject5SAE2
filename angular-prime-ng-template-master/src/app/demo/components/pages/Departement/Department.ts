export interface Department {
    id: number;
    nom: string;
    type: string;  // Assuming `type` is based on your DepartmentType enum
    description: string;
    status: string;
    location:string;
    budget: number;
    manager: string;
    numberOfEmployees :number;
  }
  