import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ProjectDiaporamaProps {
  images: string[];
  alt?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number; // ms
  transitionDuration?: number; // s
}

export function ProjectDiaporama({ images, alt = "", autoPlay = false, autoPlayInterval = 6000, transitionDuration = 0.1 }: ProjectDiaporamaProps) {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);

  const goTo = (index: number) => setCurrent((index + images.length) % images.length);
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  // Avancée automatique (glisse toujours vers l'avant)
  useEffect(() => {
    if (!isPlaying || images.length <= 1) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % images.length), autoPlayInterval);
    return () => clearInterval(id);
  }, [isPlaying, images.length, autoPlayInterval]);

  // Slide GSAP : la bande d'images se translate selon l'index courant.
  // xPercent est relatif à la largeur de la bande (N * 100%), donc pour
  // afficher la slide i, on décale de -(i / N) * 100%.
  useEffect(() => {
    if (!trackRef.current || images.length === 0) return;
    const targetXPercent = -current * (100 / images.length);

    if (isFirstRender.current) {
      gsap.set(trackRef.current, { xPercent: targetXPercent });
      isFirstRender.current = false;
      return;
    }

    gsap.to(trackRef.current, {
      xPercent: targetXPercent,
      duration: transitionDuration,
      ease: "power2.inOut",
    });
  }, [current, images.length, transitionDuration]);

  if (images.length === 0) {
    return <span className="Project-Diaporama-empty">Aucune image disponible</span>;
  }

  return (
    <div className="Project-Diaporama w-[100%] relative overflow-hidden rounded-lg">
      <span className="test">
        <div ref={trackRef} className="Project-Diaporama-track flex h-full" style={{ width: `${images.length * 100}%` }}>
          {images.map((src, i) => (
            <div
              key={src}
              className="Project-Diaporama-slide relative shrink-0 h-full"
              style={{ width: `${100 / images.length}%` }}
              aria-hidden={i !== current}
            >
              <img
                src={src}
                alt={`${alt} — visuel ${i + 1}`}
                loading={Math.abs(i - current) <= 1 ? "eager" : "lazy"}
                className="Project-Diaporama-img w-full h-full"
                style={{ objectPosition: "center", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </span>
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Image précédente"
            className="Project-Diaporama-arrow Project-Diaporama-arrow-left absolute left-2 top-1/2 -translate-y-1/2"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Image suivante"
            className="Project-Diaporama-arrow Project-Diaporama-arrow-right absolute right-2 top-1/2 -translate-y-1/2"
          >
            ›
          </button>

          <div className="Project-Diaporama-pills absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Aller à l'image ${i + 1}`}
                aria-current={i === current}
                className={`Project-Diaporama-pill ${i === current ? "Project-Diaporama-pill-active" : ""}`}
              />
            ))}
          </div>

          {/* <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            aria-label={isPlaying ? "Mettre en pause le diaporama" : "Lancer le diaporama automatique"}
            className="Project-Diaporama-autoplay absolute top-2 right-2"
          >
            {isPlaying ? "⏸" : "▶"}
          </button> */}
        </>
      )}
    </div>
  );
}

export default ProjectDiaporama;
