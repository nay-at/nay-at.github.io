import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import data_json from "./data/projects.json";
import { useWindowScrollProxy } from "./hooks/useWindowScrollProxy";
import { ProjectsOverview } from "./components/project/ProjectsOverview";

export default function App() {
  const contentRef = useWindowScrollProxy<HTMLDivElement>();
  return (
    <BrowserRouter>
      <div className="w-full h-full centerChild">
        {/* grand écran max 800px */}
        <div ref={contentRef} className="contentContainer  h-full overflow-scroll">
          <Routes>
            <Route
              path="/"
              element={
                <ProjectsOverview
                  projects={data_json.map((project) => ({
                    ...project,
                    show_body: false,
                  }))}
                />
              }
            />
            <Route
              path="/projects/:urlName"
              element={
                <ProjectsOverview
                  projects={data_json.map((project) => ({
                    ...project,
                    show_body: false,
                  }))}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
