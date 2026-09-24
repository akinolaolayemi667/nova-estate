export interface Agent {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  image: string;
  bio: string;
  specialties: string[];
  languages: string[];
  locationIds: string[];
  yearsOfExperience: number;
}
