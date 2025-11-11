import { ContactDTO } from './contact.dto';

export interface DogCreateDTO {
  name: string;
  age: number;
  breedId: string;
  available: boolean;
  contacts?: ContactDTO[];
}
