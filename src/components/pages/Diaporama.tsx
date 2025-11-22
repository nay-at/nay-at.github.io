import { useEffect, useState, useRef } from "react";
import type { RefObject } from "react";
import gsap from "gsap";

// ===== TYPES =====
interface ImageInfo {
  file: string;
  url: string;
}

type ImagesByFolder = Record<string, ImageInfo[]>;
type ColorCache = Record<string, string>;

// ===== UTILITIES =====
function extractFolderName(path: string): string {
  const parts = path.split("/");
  return parts[parts.length - 2];
}

function groupImagesByFolder(imageModules: Record<string, string>, validFolders: string[]): ImagesByFolder {
  return Object.entries(imageModules).reduce((acc, [path, url]) => {
    const folder = extractFolderName(path);
    const file = path.split("/").pop() || "";

    if (!validFolders.includes(folder)) return acc;

    if (!acc[folder]) acc[folder] = [];
    acc[folder].push({ file, url });

    return acc;
  }, {} as ImagesByFolder);
}

async function extractDominantColor(url: string): Promise<string> {
  // TODO: voir si y a pas plus efficace
  const DEFAULT_COLOR = "rgb(250,250,250)";

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const size = 40;
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(DEFAULT_COLOR);

      ctx.drawImage(img, 0, 0, size, size);
      const imageData = ctx.getImageData(0, 0, size, size).data;

      const color = findMostFrequentColor(imageData);
      resolve(color);
    };

    img.onerror = () => resolve(DEFAULT_COLOR);
    img.src = url;
  });
}

function findMostFrequentColor(data: Uint8ClampedArray): string {
  const colorCounts = new Map<number, number>();

  // Sample pixels and count colors
  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];
    if (alpha < 128) continue; // Skip transparent pixels

    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Reduce color space to 5 bits per channel
    const colorKey = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3);
    colorCounts.set(colorKey, (colorCounts.get(colorKey) || 0) + 1);
  }

  // Find most frequent color
  let maxKey = 0;
  let maxCount = 0;

  colorCounts.forEach((count, key) => {
    if (count > maxCount) {
      maxCount = count;
      maxKey = key;
    }
  });

  // Convert back to RGB
  const r = ((maxKey >> 10) & 31) << 3;
  const g = ((maxKey >> 5) & 31) << 3;
  const b = (maxKey & 31) << 3;

  return `rgb(${r}, ${g}, ${b})`;
}

// ===== HOOKS =====
function useSlideAnimation(trackRef: RefObject<HTMLDivElement | null>, index: number) {
  useEffect(() => {
    if (!trackRef.current) return;

    gsap.to(trackRef.current, {
      x: `-${index * 100}%`,
      duration: 1,
      ease: "power2.inOut",
    });
  }, [index, trackRef]);
}

function useBackgroundColors(folders: string[], imagesByFolder: ImagesByFolder): ColorCache {
  const [bgColors, setBgColors] = useState<ColorCache>({});

  useEffect(() => {
    if (folders.length === 0) return;

    folders.forEach(async (folder) => {
      if (bgColors[folder]) return;

      const images = imagesByFolder[folder] || [];
      const firstImageUrl = images[0]?.url;

      if (!firstImageUrl) return;

      const color = await extractDominantColor(firstImageUrl);
      setBgColors((prev) => ({ ...prev, [folder]: color }));
    });
  }, [folders, imagesByFolder]);

  return bgColors;
}

// ===== COMPONENTS =====
interface SlideProps {
  folder: string;
  images: ImageInfo[];
  isActive: boolean;
  backgroundColor: string;
  titleColor: string;
  onClick: () => void;
}

function Slide({ folder, images, isActive, backgroundColor, titleColor, onClick }: SlideProps) {
  const firstImage = images[0];

  return (
    <div
      className="h-full w-full flex-[0_0_100%] flex flex-col"
      onClick={onClick}
      style={{ opacity: isActive ? "1" : "0", transition: "all 1000ms ease" }}
    >
      <div className="p-10 absolute uppercase text-[4rem]" style={{ color: titleColor }}>
        <strong>{folder}</strong>
      </div>

      <div className="flex-grow flex items-center justify-center">
        {images.length === 0 ? (
          <div>Aucune image</div>
        ) : (
          <div
            className="mt-[70%] w-[90%] h-[80%] max-w-[900px] max-h-[900px] rounded"
            style={{
              backgroundImage: `url("${firstImage.url}")`,
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
              backgroundSize: "cover",
              boxShadow: `0 0 70px 90px ${backgroundColor} inset`,
              transition: "all 500ms ease",
            }}
          />
        )}
      </div>
    </div>
  );
}
//TODO: Tag
//TODO: Bouton pour accéder directement à un projet précis
//TODO: affichage de titre (avec couleur qui change ? complémentaire au bg ?  ou bg + clair ? version hsl ?)
//TODO: affichage de titre (avec couleur qui change ? complémentaire au bg ?  ou bg + clair ? version hsl ?)
// ===== MAIN COMPONENT =====
export default function Diaporama({ label }: { label: string }) {
  const readmes = import.meta.glob("../../projects/*/Readme.md", { eager: true, as: "raw" }) as Record<string, string>;

  const imageModules = import.meta.glob("../../projects/*/*.{png,jpg,jpeg,gif,svg,webp}", { eager: true, as: "url" }) as Record<string, string>;

  const folders = Object.keys(readmes).map(extractFolderName);
  const imagesByFolder = groupImagesByFolder(imageModules, folders);

  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const bgColors = useBackgroundColors(folders, imagesByFolder);
  useSlideAnimation(trackRef, index);

  function handleNext() {
    if (folders.length === 0) return;
    setIndex((i) => (i + 1) % folders.length);
  }

  const currentFolder = folders[index] || "";
  const currentBgColor = bgColors[currentFolder] || "rgb(250,250,250)";
  const titleColor = "red";

  return (
    <div
      className="w-full h-full flex items-center justify-center border-solid box-border overflow-hidden"
      style={{ background: currentBgColor, transition: "all 500ms ease" }}
    >
      <div className="w-11/12 h-90/100 max-w-[900px] max-h-[900px] flex flex-nowrap">
        <div ref={trackRef} className="flex w-full ">
          {folders.map((folder, idx) => (
            <Slide
              key={folder}
              folder={folder}
              images={imagesByFolder[folder] || []}
              isActive={idx === index}
              backgroundColor={currentBgColor}
              titleColor={titleColor}
              onClick={handleNext}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
