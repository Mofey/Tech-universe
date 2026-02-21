import type { Planet } from "../types/ml";

type Props = {
  planets: Planet[];
  zoom: number;
  panX: number;
  panY: number;
  labelsVisible: boolean;
  planetScale?: number;
  onSelect: (planet: Planet) => void;
};

export function UniverseScene({
  planets,
  zoom,
  panX,
  panY,
  labelsVisible,
  planetScale = 1,
  onSelect,
}: Props) {
  return (
    <div
      className="absolute inset-0 transition-transform duration-100"
      style={{ transform: `translate(${panX}px, ${panY}px) scale(${zoom})` }}
    >
      {planets.map((planet, index) => {
        const scaledSize = planet.size * planetScale;
        return (
        <button
          key={planet.id}
          type="button"
          data-planet="true"
          onClick={() => onSelect(planet)}
          className="absolute cursor-pointer border-none bg-transparent p-0 text-left transition duration-300 hover:scale-110"
          style={{
            width: `${scaledSize}px`,
            height: `${scaledSize}px`,
            left: `${planet.x}%`,
            top: `${planet.y}%`,
            transform: "translate(-50%, -50%)",
            color: planet.color,
          }}
        >
          <span
            className="orbit-ring pointer-events-none absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: `${scaledSize + 40}px`,
              height: `${scaledSize + 40}px`,
              animationDuration: `${30 + index * 5}s`,
            }}
          />
          <span
            className="pointer-events-none absolute -inset-[20%] rounded-full opacity-60 blur-[20px]"
            style={{ background: planet.glowColor }}
          />
          <span
            className="relative block h-full w-full overflow-hidden rounded-full"
            style={{
              background: planet.gradient,
              boxShadow: `inset -${scaledSize / 4}px -${scaledSize / 4}px ${scaledSize / 2}px rgba(0,0,0,0.5), inset ${scaledSize / 8}px ${scaledSize / 8}px ${scaledSize / 3}px rgba(255,255,255,0.2)`,
            }}
          />
          <span
            className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-orbitron text-[10px] font-medium sm:-bottom-9 sm:text-[11px]"
            style={{ color: planet.color, opacity: labelsVisible ? 0.9 : 0 }}
          >
            {planet.name}
          </span>
        </button>
        );
      })}
    </div>
  );
}
