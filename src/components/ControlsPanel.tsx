type Props = {
  zoom: number;
  onSetZoom: (value: number) => void;
  onPanUp: () => void;
  onPanDown: () => void;
  onPanLeft: () => void;
  onPanRight: () => void;
  onToggleLabels: () => void;
};

const buttonClass =
  "h-9 w-9 rounded-full border border-cyan-300/40 bg-cyan-300/10 text-sm text-cyan-300 transition hover:scale-110 hover:bg-cyan-300/20 sm:h-11 sm:w-11 sm:text-lg";

export function ControlsPanel({
  zoom,
  onSetZoom,
  onPanUp,
  onPanDown,
  onPanLeft,
  onPanRight,
  onToggleLabels,
}: Props) {
  return (
    <section
      className="fixed z-20 flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-cyan-300/30 bg-slate-950/90 px-3 py-2 backdrop-blur-lg sm:gap-4 sm:px-4 sm:py-3"
      style={{ left: "50%", bottom: "max(2.1rem, calc(env(safe-area-inset-bottom) + 1.5rem))" }}
    >
      <div className="border-x border-cyan-300/30 px-2 font-orbitron text-[10px] text-cyan-300 sm:px-4 sm:text-xs">
        ZOOM {Math.round(zoom * 100)}%
      </div>
      <input
        aria-label="Zoom level"
        type="range"
        min={50}
        max={200}
        step={5}
        value={Math.round(zoom * 100)}
        onChange={(e) => onSetZoom(Number(e.target.value) / 100)}
        className="w-16 accent-cyan-300 sm:w-24"
      />
      <button type="button" className={buttonClass} title="Move Up" onClick={onPanUp}>
        N
      </button>
      <button type="button" className={buttonClass} title="Move Down" onClick={onPanDown}>
        S
      </button>
      <button type="button" className={buttonClass} title="Move Left" onClick={onPanLeft}>
        W
      </button>
      <button type="button" className={buttonClass} title="Move Right" onClick={onPanRight}>
        E
      </button>
      <button type="button" className={buttonClass} title="Toggle Labels" onClick={onToggleLabels}>
        L
      </button>
    </section>
  );
}
