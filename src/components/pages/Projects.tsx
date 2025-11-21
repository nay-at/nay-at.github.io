// ...existing code...
export default function Projects({ label }: { label: string }) {
  // importe tous les Readme.md sous src/projects/*/Readme.md (injection à la compilation)
  const readmes = import.meta.glob("../../projects/*/Readme.md", { eager: true, as: "raw" }) as Record<string, string>;

  // importe toutes les images sous src/projects/*/*
  const imageModules = import.meta.glob("../../projects/*/*.{png,jpg,jpeg,gif,svg,webp}", { eager: true, as: "url" }) as Record<string, string>;

  // extrait le nom du dossier parent pour chaque Readme
  const folders = Object.keys(readmes).map((p) => {
    const parts = p.split("/");
    return parts[parts.length - 2]; // ex: '../../projects/3DCourse/Readme.md' -> '3DCourse'
  });

  // regroupe les images par dossier (seulement pour les dossiers qui ont un Readme)
  const imagesByFolder = Object.entries(imageModules).reduce((acc, [path, url]) => {
    const parts = path.split("/");
    const folder = parts[parts.length - 2];
    const file = parts[parts.length - 1];
    if (!folders.includes(folder)) return acc;
    if (!acc[folder]) acc[folder] = [];
    acc[folder].push({ file, url });
    return acc;
  }, {} as Record<string, { file: string; url: string }[]>);

  return (
    <div className="projects w-full h-full">
      <div className="m-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 ">
        {folders.map((f) => {
          const imgs = imagesByFolder[f] || [];
          const imagesToShow = imgs.slice(0, 4); // max 4
          const count = imagesToShow.length;
          const colsClass = count === 1 ? "grid-cols-1" : count === 2 ? "grid-rows-2" : "grid-cols-2";
          /*  */
          const baseClasses = "project_minia h-full w-full grid "; /* gap-2 */

          const largeClasses = "  col-span-2 aspect-[2/1]";

          const imgClasses = "h-1/2";
          return (
            <div key={f}>
              <div className={`project h-full w-full rounded-[8px] m-1`}>
                <div className={`${baseClasses}  ${colsClass} `}>
                  {imagesToShow.map((img, i) => (
                    <div
                      className={`cursor-pointer img-colorize  overflow-hidden relative group  w-full h-full object-cover p-1 rounded-[8px] ${
                        (count === 3 && i === 2) || count === 2 ? largeClasses : ""
                      } `}
                      key={img.file}
                    >
                      <img
                        className={`${imgClasses}  w-full h-full object-cover object-center  rounded-[8px] border-gray-500 border-2 border-solid `}
                        src={img.url}
                        alt={img.file}
                      ></img>
                    </div>
                  ))}
                </div>
                <div className={`project_name m-2`}>
                  <strong>{f}</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
