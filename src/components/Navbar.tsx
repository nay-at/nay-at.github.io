import { useEffect, useState } from "react";

function NavButton({ label, onClick, isSelected }: { label: string; onClick: () => void; isSelected: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontWeight: isSelected ? "bold" : "normal",
        textDecoration: isSelected ? "underline" : "none",
      }}
    >
      {label}
    </button>
  );
}

const pages = ["WhoAmI", "Contact", "Projects"];

function getPageFromPath() {
  const path = window.location.pathname.slice(1); // retire le "/"
  return pages.includes(path) ? path : "WhoAmI";
}

export default function Navbar() {
  const [selected, setSelected] = useState(getPageFromPath);

  // Met à jour l'URL propre quand l'état change
  useEffect(() => {
    window.history.pushState({}, "", `/${selected}`);
  }, [selected]);

  // Met à jour l'état si l'utilisateur utilise les flèches navigation
  useEffect(() => {
    const onPopState = () => setSelected(getPageFromPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <nav>
      {pages.map((page) => (
        <NavButton key={page} label={page} onClick={() => setSelected(page)} isSelected={selected === page} />
      ))}
      <p>Page sélectionnée : {selected}</p>
    </nav>
  );
}
