export interface KeyValueDTO {
  code: string;
  description: string;
}

export const CONTACT_TYPES: KeyValueDTO[] = [
  {
    code: 'EMAIL',
    description: 'E-mail',
  },
  {
    code: 'TELEFONE',
    description: 'Telefone',
  },
];
