import { useMemo } from "react";
import type { Planet } from "../types/ml";

type Props = {
  planets: Planet[];
  zoom: number;
  panX: number;
  panY: number;
  labelsVisible: boolean;
  isMobile?: boolean;
  isDragging?: boolean;
  planetScale?: number;
  onSelect: (planet: Planet) => void;
};

export function UniverseScene({
  planets,
  zoom,
  panX,
  panY,
  labelsVisible,
  isMobile = false,
  isDragging = false,
  planetScale = 1,
  onSelect,
}: Props) {
  const renderedPlanets = useMemo(
    () =>
      planets.map((planet, index) => {
        const scaledSize = planet.size * planetScale;
        return (
          <button
            key={planet.id}
            type="button"
            data-planet="true"
            onClick={() => onSelect(planet)}
            className={`absolute cursor-pointer border-none bg-transparent p-0 text-left ${
              isMobile ? "" : "transition duration-300 hover:scale-110"
            }`}
            style={{
              width: `${scaledSize}px`,
              height: `${scaledSize}px`,
              left: `${planet.x}%`,
              top: `${planet.y}%`,
              transform: "translate(-50%, -50%)",
              color: planet.color,
            }}
          >
            {!isMobile && (
              <span
                className="orbit-ring pointer-events-none absolute left-1/2 top-1/2 rounded-full"
                style={{
                  width: `${scaledSize + 40}px`,
                  height: `${scaledSize + 40}px`,
                  animationDuration: `${30 + index * 5}s`,
                }}
              />
            )}
            {!isMobile && !isDragging && (
              <span
                className="pointer-events-none absolute -inset-[20%] rounded-full opacity-60 blur-[20px]"
                style={{ background: planet.glowColor }}
              />
            )}
            <span
              className="relative block h-full w-full overflow-hidden rounded-full"
              style={{
                background: planet.gradient,
                boxShadow:
                  isMobile || isDragging
                    ? `inset -${scaledSize / 7}px -${scaledSize / 7}px ${scaledSize / 3}px rgba(0,0,0,0.35)`
                    : `inset -${scaledSize / 4}px -${scaledSize / 4}px ${scaledSize / 2}px rgba(0,0,0,0.5), inset ${scaledSize / 8}px ${scaledSize / 8}px ${scaledSize / 3}px rgba(255,255,255,0.2)`,
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
      }),
    [isDragging, isMobile, labelsVisible, onSelect, planetScale, planets],
  );

  return (
    <div
      className="absolute inset-0 will-change-transform"
      style={{ transform: `translate3d(${panX}px, ${panY}px, 0) scale(${zoom})` }}
    >
      {renderedPlanets}
    </div>
  );
}
