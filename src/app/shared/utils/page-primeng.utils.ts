import { TableLazyLoadEvent } from 'primeng/table';
import { PageConfigDTO } from '../model/page/page-config.dto';

export const getPagePrimeng = <T>(
  event: TableLazyLoadEvent,
  filters?: T
): PageConfigDTO<T> => {
  const size = event.rows ?? 10;
  const first = event.first ?? 0;

  const page = size > 0 ? Math.floor(first / size) : 0;

  return {
    page,
    size,
    filters: filters ?? ({} as T),
  };
};
