import { AnimalDTO } from './animal.dto';

export interface DogDTO extends AnimalDTO {
  available: boolean;
}
