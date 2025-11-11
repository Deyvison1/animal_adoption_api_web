export const contactConstants = {};

export const types: KeyValueDTO[] = [
  {
    code: 'EMAIL',
    description: 'E-mail',
  },
  { code: 'TELEFONE', description: 'Telefone' },
];

export interface KeyValueDTO {
  code: string;
  description: string;
}
