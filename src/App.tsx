import "./App.css";

export default function App() {
  return (
    <div className="main">
      {/* 
      <Navbar /> */}
      <div className="bentoBox">
        <div>
          <WhoAmI></WhoAmI>
        </div>
        <div>
          <Contact></Contact>
        </div>
        <div>
          <Heatmap></Heatmap>
        </div>
        <div>
          <Projects></Projects>
        </div>
      </div>
    </div>
  );
}
