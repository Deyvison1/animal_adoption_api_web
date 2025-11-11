import { BaseDTO } from './base/base.dto';
import { AnimalTypeDTO } from './animal-type.dto';

export interface BreedDTO extends BaseDTO {
  id: string;
  name: string;
  nationality: string;
  type: AnimalTypeDTO;
}
