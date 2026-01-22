import { PageConfigDTO } from '../../shared/model/page/page-config.dto';

export const DEFAULT_PAGE_CONFIG: PageConfigDTO<any> = {
  size: 5,
  page: 0,
} as const;
