import { useCallback, useEffect, useState } from "react";
import { ControlsPanel } from "./components/ControlsPanel";
import { InfoPanel } from "./components/InfoPanel";
import { MiniMap } from "./components/MiniMap";
import { PlanetDetailModal } from "./components/PlanetDetailModal";
import { SpaceBackground } from "./components/SpaceBackground";
import { UniverseScene } from "./components/UniverseScene";
import { universes } from "./data/planets";
import { useUniverseNavigation } from "./hooks/useUniverseNavigation";
import type { Planet } from "./types/ml";

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
const PAN_STEP = 60;

function App() {
  if (universes.length === 0) return null;
  const currentYear = new Date().getFullYear();

  const {
    zoom,
    panX,
    panY,
    indicatorPosition,
    zoomIn,
    zoomOut,
    zoomByWheel,
    setPan,
    reset,
    setZoom,
  } = useUniverseNavigation();
  const [viewportWidth, setViewportWidth] = useState(
    typeof window === "undefined" ? 1200 : window.innerWidth,
  );
  const [viewportHeight, setViewportHeight] = useState(
    typeof window === "undefined" ? 800 : window.innerHeight,
  );
  const [activeUniverseId, setActiveUniverseId] = useState(universes[0].id);
  const [labelsVisible, setLabelsVisible] = useState(true);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [exploredPlanets, setExploredPlanets] = useState<Set<string>>(new Set());
  const activeUniverse =
    universes.find((universe) => universe.id === activeUniverseId) ?? universes[0];
  const foundationTitleByUniverse: Record<string, string> = {
    ml: "Mathematical Foundation",
    statistics: "Statistical Foundation",
    "data-analysis": "Analytical Foundation",
    "data-science": "Scientific Foundation",
    fullstack: "Development Foundation",
    "cyber-security": "Security Foundation",
    "ai-development": "AI Foundation",
    "graphic-designing": "Design Foundation",
    "cloud-engineering": "Cloud Foundation",
    "game-development": "Game Foundation",
    "mobile-app-development": "Mobile Foundation",
    robotics: "Robotics Foundation",
  };
  const foundationTitle =
    foundationTitleByUniverse[activeUniverse.id] ?? "Core Foundation";
  const isMobile = viewportWidth < 640;
  const planetScale = isMobile ? 0.86 : viewportWidth < 1024 ? 0.92 : 1;
  const mobileDefaultZoom = 0.9;
  const mobilePanYOffset = 30;
  const renderedPanY = isMobile ? panY + mobilePanYOffset : panY;
  const canPan = false;
  const planets = activeUniverse.planets;
  const exploredCount = planets.filter((planet) =>
    exploredPlanets.has(`${activeUniverse.id}:${planet.id}`),
  ).length;

  useEffect(() => {
    const onResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (isMobile) setZoom(mobileDefaultZoom);
  }, [isMobile, setZoom]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (selectedPlanet && e.key === "Escape") {
        setSelectedPlanet(null);
        return;
      }
      if (e.key === "+" || e.key === "=") zoomIn();
      else if (e.key === "-") zoomOut();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedPlanet, zoomIn, zoomOut]);

  const openPlanet = useCallback((planet: Planet) => {
    const targetZoom = isMobile ? 1.2 : 1.35;
    const planetX = (planet.x / 100) * viewportWidth;
    const planetY = (planet.y / 100) * viewportHeight;
    const targetPanX = viewportWidth / 2 - planetX * targetZoom;
    const targetPanY =
      viewportHeight / 2 - planetY * targetZoom - (isMobile ? mobilePanYOffset : 0);

    setZoom(targetZoom);
    setPan(targetPanX, targetPanY);

    setSelectedPlanet(planet);
    setExploredPlanets((prev) => {
      const next = new Set(prev);
      next.add(`${activeUniverse.id}:${planet.id}`);
      return next;
    });
  }, [activeUniverse.id, isMobile, mobilePanYOffset, setPan, setZoom, viewportHeight, viewportWidth]);

  const handleResetView = () => {
    reset();
    if (isMobile) setZoom(mobileDefaultZoom);
  };

  return (
    <main
      className={`space-bg relative h-[100dvh] w-screen overflow-hidden ${
        canPan ? "cursor-grab" : "cursor-default"
      }`}
      style={{ touchAction: "manipulation" }}
      onWheel={(e) => {
        e.preventDefault();
        zoomByWheel(e.deltaY);
      }}
    >
      <SpaceBackground isMobile={isMobile} />

      <UniverseScene
        planets={planets}
        zoom={zoom}
        panX={panX}
        panY={renderedPanY}
        labelsVisible={labelsVisible}
        isMobile={isMobile}
        isDragging={false}
        planetScale={planetScale}
        onSelect={openPlanet}
      />

      <div data-lock-pan="true">
        <InfoPanel
          title={activeUniverse.title}
          message={activeUniverse.message}
          planets={planets.length}
          explored={exploredCount}
          universes={universes}
          activeUniverseId={activeUniverse.id}
          onChangeUniverse={(universeId) => {
            setActiveUniverseId(universeId);
            setSelectedPlanet(null);
            handleResetView();
          }}
        />
      </div>

      <div data-lock-pan="true" className="hidden sm:block">
        <MiniMap
          planets={planets}
          playerLeft={indicatorPosition.left}
          playerTop={indicatorPosition.top}
        />
      </div>

      <div data-lock-pan="true">
        <ControlsPanel
          zoom={zoom}
          onSetZoom={(value) => setZoom(clamp(value, MIN_ZOOM, MAX_ZOOM))}
          onPanUp={() => setPan(panX, panY + PAN_STEP)}
          onPanDown={() => setPan(panX, panY - PAN_STEP)}
          onPanLeft={() => setPan(panX + PAN_STEP, panY)}
          onPanRight={() => setPan(panX - PAN_STEP, panY)}
          onToggleLabels={() => setLabelsVisible((v) => !v)}
        />
      </div>

      <footer
        data-lock-pan="true"
        className="pointer-events-none fixed bottom-0 left-0 z-10 w-full pb-1 text-center text-[11px] text-slate-300/80 sm:text-xs"
      >
        {"\u00A9"} {currentYear} Made with {"\u2764\uFE0F"} by Mofetoluwa
      </footer>

      {selectedPlanet && (
        <PlanetDetailModal
          planet={selectedPlanet}
          foundationTitle={foundationTitle}
          onClose={() => setSelectedPlanet(null)}
        />
      )}
    </main>
  );
}

export default App;
