export interface IPostFilters {
  series: string[];
  semesters: string[];
  professor: string;
  search: string;
}

export interface IFilterOption {
  value: string;
  label: string;
}

export interface IFilterCheckboxGroupProps {
  legend: string;
  options: IFilterOption[];
  selected: string[];
  onToggle: (value: string) => void;
}

export interface IFilterPanelProps {
  filters: IPostFilters;
  seriesOptions: IFilterOption[];
  semesterOptions: IFilterOption[];
  professorOptions: IFilterOption[];
  activeFilterCount: number;
  onToggleSeries: (value: string) => void;
  onToggleSemester: (value: string) => void;
  onProfessorChange: (value: string) => void;
  onClearFilters: () => void;
}
