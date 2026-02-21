import { useCallback, useMemo, useState } from "react";

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function useUniverseNavigation() {
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);

  const zoomIn = useCallback(
    () => setZoom((z) => clamp(Number((z + 0.1).toFixed(2)), MIN_ZOOM, MAX_ZOOM)),
    [],
  );

  const zoomOut = useCallback(
    () => setZoom((z) => clamp(Number((z - 0.1).toFixed(2)), MIN_ZOOM, MAX_ZOOM)),
    [],
  );

  const zoomByWheel = useCallback((deltaY: number) => {
    const delta = deltaY > 0 ? -0.1 : 0.1;
    setZoom((z) => clamp(Number((z + delta).toFixed(2)), MIN_ZOOM, MAX_ZOOM));
  }, []);

  const panBy = useCallback((dx: number, dy: number) => {
    setPanX((x) => x + dx);
    setPanY((y) => y + dy);
  }, []);

  const setPan = useCallback((x: number, y: number) => {
    setPanX(x);
    setPanY(y);
  }, []);

  const panByKeyboard = useCallback((key: string) => {
    const speed = 30;
    if (key === "ArrowUp" || key === "w") setPanY((y) => y + speed);
    if (key === "ArrowDown" || key === "s") setPanY((y) => y - speed);
    if (key === "ArrowLeft" || key === "a") setPanX((x) => x + speed);
    if (key === "ArrowRight" || key === "d") setPanX((x) => x - speed);
  }, []);

  const reset = useCallback(() => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  }, []);

  const indicatorPosition = useMemo(() => {
    const left = clamp(50 - panX / 10, 10, 90);
    const top = clamp(50 - panY / 10, 10, 90);
    return { left, top };
  }, [panX, panY]);

  return {
    zoom,
    panX,
    panY,
    indicatorPosition,
    zoomIn,
    zoomOut,
    zoomByWheel,
    panBy,
    setPan,
    panByKeyboard,
    reset,
    setZoom,
  };
}
