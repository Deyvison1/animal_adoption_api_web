import { AnimalTypeDTO } from "./animal-type.dto";

export interface BreedDTO {
  id: string;
  name: string;
  nationality: string;
  type: AnimalTypeDTO;
}
