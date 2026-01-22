import { ContactDTO } from './contact.dto';

export interface CatCreateDTO {
  name: string;
  age: number;
  breedId: string;
  available: boolean;
  contacts?: ContactDTO[];
}
