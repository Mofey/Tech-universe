type Props = {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onToggleLabels: () => void;
};

const buttonClass =
  "h-9 w-9 rounded-full border border-cyan-300/40 bg-cyan-300/10 text-sm text-cyan-300 transition hover:scale-110 hover:bg-cyan-300/20 sm:h-11 sm:w-11 sm:text-lg";

export function ControlsPanel({ zoom, onZoomIn, onZoomOut, onReset, onToggleLabels }: Props) {
  return (
    <section
      className="fixed z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-cyan-300/30 bg-slate-950/90 px-3 py-2 backdrop-blur-lg sm:gap-4 sm:px-6 sm:py-3"
      style={{ left: "50%", bottom: "max(2.1rem, calc(env(safe-area-inset-bottom) + 1.5rem))" }}
    >
      <button type="button" className={buttonClass} title="Zoom In" onClick={onZoomIn}>
        +
      </button>
      <button type="button" className={buttonClass} title="Zoom Out" onClick={onZoomOut}>
        -
      </button>
      <div className="border-x border-cyan-300/30 px-2 font-orbitron text-[10px] text-cyan-300 sm:px-4 sm:text-xs">
        ZOOM {Math.round(zoom * 100)}%
      </div>
      <button type="button" className={buttonClass} title="Reset View" onClick={onReset}>
        R
      </button>
      <button type="button" className={buttonClass} title="Toggle Labels" onClick={onToggleLabels}>
        L
      </button>
    </section>
  );
}
