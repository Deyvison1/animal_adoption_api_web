import { AnimalDTO } from './animal.dto';

export interface CatDTO extends AnimalDTO {
  available: boolean;
  published: boolean;
}
