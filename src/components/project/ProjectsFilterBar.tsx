export type FilterMode = "and" | "or";
export type SortField = "title" | "date" | "type" | "technology";
export type SortDirection = "asc" | "desc";

interface ProjectsFilterBarProps {
  availableTypes: string[];
  availableTechnologies: string[];
  selectedTypes: Set<string>;
  selectedTechnologies: Set<string>;
  mode: FilterMode;
  sortField: SortField;
  sortDirection: SortDirection;
  onToggleType: (value: string) => void;
  onToggleTechnology: (value: string) => void;
  onModeChange: (mode: FilterMode) => void;
  onSortFieldChange: (field: SortField) => void;
  onSortDirectionToggle: () => void;
  onReset: () => void;
}

const SORT_LABELS: Record<SortField, string> = {
  title: "Titre",
  date: "Date",
  type: "Type",
  technology: "Technologie",
};

export function ProjectsFilterBar({
  availableTypes,
  availableTechnologies,
  selectedTypes,
  selectedTechnologies,
  mode,
  sortField,
  sortDirection,
  onToggleType,
  onToggleTechnology,
  onModeChange,
  onSortFieldChange,
  onSortDirectionToggle,
  onReset,
}: ProjectsFilterBarProps) {
  const hasActiveFilters = selectedTypes.size > 0 || selectedTechnologies.size > 0;

  return (
    <div className="Projects-FilterBar contentMargin flex flex-col gap-4 pb-5">
      <div className="Filter-Row flex flex-row flex-wrap items-center gap-3">
        <span className="Filter-Label">Type</span>
        <div className="flex flex-wrap gap-1.5">
          {availableTypes.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onToggleType(t)}
              aria-pressed={selectedTypes.has(t)}
              className={`tag Filter-Tag ${selectedTypes.has(t) ? "Filter-Tag-active" : ""}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="Filter-Row flex flex-row flex-wrap items-center gap-3">
        <span className="Filter-Label">Technologie</span>
        <div className="flex flex-wrap gap-1.5">
          {availableTechnologies.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onToggleTechnology(t)}
              aria-pressed={selectedTechnologies.has(t)}
              className={`tag Filter-Tag ${selectedTechnologies.has(t) ? "Filter-Tag-active" : ""}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="Filter-Row flex flex-row flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="Filter-Label">Correspondance</span>
          <div className="Filter-ModeToggle flex gap-1">
            <button
              type="button"
              onClick={() => onModeChange("and")}
              aria-pressed={mode === "and"}
              className={`tag Filter-Tag ${mode === "and" ? "Filter-Tag-active" : ""}`}
              title="Le projet doit correspondre à tous les filtres sélectionnés"
            >
              ET (strict)
            </button>
            <button
              type="button"
              onClick={() => onModeChange("or")}
              aria-pressed={mode === "or"}
              className={`tag Filter-Tag ${mode === "or" ? "Filter-Tag-active" : ""}`}
              title="Le projet doit correspondre à au moins un des filtres sélectionnés"
            >
              OU
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="Filter-Label">Trier par</span>
          <select value={sortField} onChange={(e) => onSortFieldChange(e.target.value as SortField)} className="Filter-Sort-Select tag">
            {(Object.keys(SORT_LABELS) as SortField[]).map((f) => (
              <option key={f} value={f}>
                {SORT_LABELS[f]}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={onSortDirectionToggle}
            className="tag Filter-Tag"
            aria-label={sortDirection === "asc" ? "Ordre croissant" : "Ordre décroissant"}
          >
            {sortDirection === "asc" ? "↑" : "↓"}
          </button>
        </div>

        {hasActiveFilters && (
          <button type="button" onClick={onReset} className="tag Filter-Tag">
            Réinitialiser
          </button>
        )}
      </div>
    </div>
  );
}

export default ProjectsFilterBar;
