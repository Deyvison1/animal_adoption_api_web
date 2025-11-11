import { BaseDTO } from './base/base.dto';

export interface ContactDTO extends BaseDTO {
  name: string;
  value: string;
}
