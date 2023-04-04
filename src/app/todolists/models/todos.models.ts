export interface Todos {
  id: string;
  title: string;
  addedDate: string;
  order: number;
}
export type FiltersType = 'all' | 'active' | 'completed';
export interface DomainType extends Todos {
  filter: FiltersType;
}
