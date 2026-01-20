export enum StatusAnimal {
  PUBLISHED = 'PUBLISHED',
  NOT_PUBLISHED = 'NOT_PUBLISHED',
  REPUBLISHED = 'REPUBLISHED',
  DESPUBLICADO = 'DESPUBLICADO',
}

export interface StatusAnimalMeta {
  id: number;
  name: string;
}

export const STATUS_ANIMAL_META: Record<StatusAnimal, StatusAnimalMeta> = {
  [StatusAnimal.PUBLISHED]: {
    id: 1,
    name: 'Publicado',
  },
  [StatusAnimal.NOT_PUBLISHED]: {
    id: 2,
    name: 'Não publicado',
  },
  [StatusAnimal.REPUBLISHED]: {
    id: 4,
    name: 'Republicado',
  },
  [StatusAnimal.DESPUBLICADO]: {
    id: 3,
    name: 'Despublicado, por algum motivo',
  },
};
