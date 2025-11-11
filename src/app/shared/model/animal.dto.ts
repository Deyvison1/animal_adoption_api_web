import { AnimalImageDTO } from './animal-image.dto';
import { BaseDTO } from './base/base.dto';
import { BreedDTO } from './breed.dto';
import { ContactDTO } from './contact.dto';

export interface AnimalDTO extends BaseDTO {
  name: string;
  age: number;
  breed: BreedDTO;
  description: string;
  images: AnimalImageDTO[];
  contacts: ContactDTO[];
}
