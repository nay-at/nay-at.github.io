import React, { useState, useMemo } from "react";
import type { Project } from "../../interfaces";
import { ProjectDiaporama } from "./ProjectDiaporama";
import { useParams } from "react-router-dom";
import { ProjectsFilterBar, type FilterMode, type SortField, type SortDirection } from "./ProjectsFilterBar";

// Vite indexe ces fichiers au build : aucune liste à maintenir manuellement.
const projectImages = import.meta.glob<string>("/public/projects/**/*.{png,jpg,jpeg,webp,gif,avif}", { eager: true, import: "default" });

function getProjectImages(title: string) {
  return Object.entries(projectImages)
    .filter(([p]) => p.includes(`/projects/${title}/preview`))
    .map(([, url]) => url);
}

const ProjectItem: React.FC<Project> = ({
  title,
  date,
  type,
  technology,
  desc_short,
  description,
  role,
  urlName,
  link,
  show_body = false,
}: Project) => {
  return (
    <div className="Project-Overview ">
      <ProjectHeader title={title} type={type} technology={technology} show_body={show_body} desc_short={desc_short} urlName={urlName} />
      {show_body && <ProjectDetails description={description} role={role} date={date} link={link} />}
    </div>
  );
};

interface ProjectProps {
  projects: Project[];
}
function matchesFilters(project: Project, selectedTypes: Set<string>, selectedTechnologies: Set<string>, mode: FilterMode): boolean {
  const hasTypeFilters = selectedTypes.size > 0;
  const hasTechFilters = selectedTechnologies.size > 0;
  if (!hasTypeFilters && !hasTechFilters) return true;

  const typeMatch =
    mode === "and" ? [...selectedTypes].every((t) => project.type.includes(t)) : [...selectedTypes].some((t) => project.type.includes(t));

  const techMatch =
    mode === "and"
      ? [...selectedTechnologies].every((t) => project.technology.includes(t))
      : [...selectedTechnologies].some((t) => project.technology.includes(t));

  if (mode === "and") {
    // Chaque catégorie active (type et/ou technology) doit être intégralement satisfaite.
    return (!hasTypeFilters || typeMatch) && (!hasTechFilters || techMatch);
  }
  // OU : il suffit qu'un des critères actifs (type ou technology) corresponde.
  return (hasTypeFilters && typeMatch) || (hasTechFilters && techMatch);
}

function sortProjects(projects: Project[], field: SortField, direction: SortDirection): Project[] {
  const sorted = [...projects].sort((a, b) => {
    let cmp = 0;
    switch (field) {
      case "title":
        cmp = a.title.localeCompare(b.title);
        break;
      case "date":
        cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case "type":
        cmp = (a.type[0] ?? "").localeCompare(b.type[0] ?? "");
        break;
      case "technology":
        cmp = (a.technology[0] ?? "").localeCompare(b.technology[0] ?? "");
        break;
    }
    return direction === "asc" ? cmp : -cmp;
  });
  return sorted;
}

export const ProjectsOverview: React.FC<ProjectProps> = ({ projects }: ProjectProps) => {
  const { urlName } = useParams<{ urlName?: string }>();
  const selectedItem = urlName ?? "";

  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [selectedTechnologies, setSelectedTechnologies] = useState<Set<string>>(new Set());
  const [mode, setMode] = useState<FilterMode>("or");
  const [sortField, setSortField] = useState<SortField>("title");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const availableTypes = useMemo(() => Array.from(new Set(projects.flatMap((p) => p.type))).sort((a, b) => a.localeCompare(b)), [projects]);
  const availableTechnologies = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.technology))).sort((a, b) => a.localeCompare(b)),
    [projects],
  );

  const toggleInSet = (set: Set<string>, value: string) => {
    const next = new Set(set);
    next.has(value) ? next.delete(value) : next.add(value);
    return next;
  };

  const visibleProjects = useMemo(() => {
    const filtered = projects.filter((p) => matchesFilters(p, selectedTypes, selectedTechnologies, mode));
    return sortProjects(filtered, sortField, sortDirection);
  }, [projects, selectedTypes, selectedTechnologies, mode, sortField, sortDirection]);

  if (selectedItem) {
    const selected = projects.find((p) => p.title === selectedItem || p.urlName === selectedItem);
    if (selected) {
      return (
        <div className="Projects-Overview h-full">
          <ProjectItem {...selected} show_body={true} />
        </div>
      );
    }
    return <div className="Projects-Overview h-full">{/* no matching project */}</div>;
  }

  return (
    <div className="Projects-Overview ">
      <header id="myHeader" className="stickyy ">
        {/* Contenu du header */}
        <h2>PROFIL</h2>
        <div>PROFIL</div>
      </header>
      <details className="contentMargin details-animated ">
        <summary>Filtre</summary>
        <ProjectsFilterBar
          availableTypes={availableTypes}
          availableTechnologies={availableTechnologies}
          selectedTypes={selectedTypes}
          selectedTechnologies={selectedTechnologies}
          mode={mode}
          sortField={sortField}
          sortDirection={sortDirection}
          onToggleType={(v) => setSelectedTypes((s) => toggleInSet(s, v))}
          onToggleTechnology={(v) => setSelectedTechnologies((s) => toggleInSet(s, v))}
          onModeChange={setMode}
          onSortFieldChange={setSortField}
          onSortDirectionToggle={() => setSortDirection((d) => (d === "asc" ? "desc" : "asc"))}
          onReset={() => {
            setSelectedTypes(new Set());
            setSelectedTechnologies(new Set());
          }}
        />
      </details>

      {visibleProjects.length === 0 ? (
        <div className="Projects-Overview-empty contentMargin">Aucun projet ne correspond aux filtres.</div>
      ) : (
        visibleProjects.map((item) => <ProjectItem {...item} key={item.title} show_body={false} />)
      )}
    </div>
  );
};

interface ProjectDetailsProps {
  description: string;
  role: string;
  date: string;
  link: string;
}

function ProjectDetails({ description, role, date, link = "" }: ProjectDetailsProps) {
  return (
    <div className="Project-Details contentMargin">
      <div className="Project-Description">
        <div className="flex flex-row pb-5">
          <div className="basis-1/5">description</div>
          <div className={`Bar-Separator basis-4/5`}></div>
        </div>
        {description}
      </div>
      <div className="Project-Role pt-10">
        <div className="flex flex-row pb-5">
          <div className="basis-1/5">role</div>
          <div className={`Bar-Separator basis-4/5`}></div>
        </div>
        {role}
      </div>
      <div className="Project-Link pt-10">
        <div className="flex flex-row pb-5">
          <div className="basis-1/5">Link</div>
          <div className={`Bar-Separator basis-4/5`}></div>
        </div>
        {link}
      </div>
    </div>
  );
}

interface ProjectHeaderProps {
  title: string;
  type: string[];
  technology: string[];
  show_body: boolean;
  desc_short: string;
  urlName: string;
}
import { Link } from "react-router-dom";

function ProjectHeader({ title, type, technology, show_body, desc_short, urlName }: ProjectHeaderProps) {
  const images = getProjectImages(urlName);

  return (
    <div className="Project-Header  contentMargin">
      <div className="Project-Head flex flex-row pb-5 ">
        <div className="Project-Title  text-left p-1 ">{title}</div>
        <div className={`Bar-Separator ${type.length > 0 ? "basis-3/5" : "basis-4/5"}`}></div>
        <div className={`Project-Type ${type.length > 0 ? "basis-1/5" : ""}  text-right p-1 flex flex-wrap justify-end gap-1`}>
          {type.map((t) => (
            <span key={t} className="Project-Type-tag tag">
              {t}
            </span>
          ))}
        </div>
      </div>
      <ProjectDiaporama images={images} alt={title} autoPlay={true} />

      <div className={`Project-Technology ${technology.length > 0 ? "basis-1/5" : ""}  text-left mt-5  mb-5 gap-2 flex flex-wrap`}>
        {technology.map((t) => (
          <span key={t} className="Project-Type-tag tag p-1">
            {t}
          </span>
        ))}
      </div>

      {!show_body && (
        <div>
          <div>{desc_short}</div>
          <div className="Project-Prebody flex flex-row pb-5 ">
            <div className={`Bar-Separator basis-4/5`}></div>

            <Link to={`/projects/${urlName}`} className="Project-Title basis-1/5 text-right p-1 block">
              + de détails
            </Link>
          </div>
          <div className="Project-Prebody flex flex-col items-center ">***</div>
        </div>
      )}
    </div>
  );
}

export default ProjectsOverview;
