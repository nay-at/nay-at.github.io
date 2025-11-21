import "./App.scss";
/* import Contact from "./components/pages/Contact";
import Heatmap from "./components/pages/Heatmap";
import Projects from "./components/pages/Projects";
import WhoAmI from "./components/pages/WhoAmI"; */
// ...existing code...

const bentoItems = [
  /*  { className: "WhoAmI md:w-1/2 max-sm:w-full md:h-4/10", Component: WhoAmI },
  { className: "Contact md:w-1/2 max-sm:w-full md:h-4/10", Component: Contact }, */
  /*  { className: "Heatmap w-full md:h-3.5/10", Component: Heatmap },
  { className: "Projects w-full ", Component: Projects }, */
];

export default function App() {
  return (
    <div className="main w-full h-full">
      {/* <Navbar /> */} {/* bentoBox */}
      <Projects /* label={`00${idx + 1}${".".repeat(10)}`} */></Projects>
    </div>
  );
}
