// Hero.jsx
import { useEffect, useRef, memo } from "react";

// Pre-compute static values
const GRID_LINES_VERTICAL = Array.from({ length: 10 });
const GRID_LINES_HORIZONTAL = Array.from({ length: 8 });
const DATA_POINTS = Array.from({ length: 20 });
const CANDLESTICK_DATA = [
  { type: "red", x: 50, y1: 100, y2: 200, rectY: 120 },
  { type: "green", x: 80, y1: 180, y2: 280, rectY: 180 },
  // ... pre-compute all candlestick data
];

// Separate SVG components for better performance
const GridLines = memo(() => (
  <>
    {GRID_LINES_VERTICAL.map((_, i) => (
      <line
        key={`v-${i}`}
        x1={i * 50}
        y1="0"
        x2={i * 50}
        y2="400"
        stroke="#1e3a5f"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    ))}
    {GRID_LINES_HORIZONTAL.map((_, i) => (
      <line
        key={`h-${i}`}
        x1="0"
        y1={i * 50}
        x2="500"
        y2={i * 50}
        stroke="#1e3a5f"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    ))}
  </>
));

const CandlestickChart = memo(() => (
  <g className="candlesticks">
    {CANDLESTICK_DATA.map((candle, index) => (
      <g key={index}>
        <line
          x1={candle.x}
          y1={candle.y1}
          x2={candle.x}
          y2={candle.y2}
          stroke={candle.type === "red" ? "#ff4560" : "#00e396"}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <rect
          x={candle.x - 5}
          y={candle.rectY}
          width="10"
          height="60"
          fill={candle.type === "red" ? "#ff4560" : "#00e396"}
        />
      </g>
    ))}
  </g>
));

const DataPoints = memo(() => (
  <g className="data-points">
    {DATA_POINTS.map((_, i) => (
      <circle
        key={i}
        cx={25 + i * 24}
        cy={140 + Math.sin(i * 0.8) * 50}
        r="1"
        fill="#0ff"
        opacity="0.4"
      />
    ))}
  </g>
));

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    // Defer mouse move handler setup
    const timer = setTimeout(() => {
      const handleMouseMove = (e) => {
        if (!heroRef.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } =
          heroRef.current.getBoundingClientRect();

        const x = (clientX - left) / width;
        const y = (clientY - top) / height;

        const moveX = (x - 0.5) * 15;
        const moveY = (y - 0.5) * 15;

        requestAnimationFrame(() => {
          const chartElements =
            heroRef.current?.querySelectorAll(".chart-line");
          chartElements?.forEach((line, index) => {
            const factor = (index + 1) * 0.1;
            line.style.transform = `translate(${moveX * factor}px, ${
              moveY * factor
            }px)`;
          });
        });
      };

      document.addEventListener("mousemove", handleMouseMove, {
        passive: true,
      });
      return () => document.removeEventListener("mousemove", handleMouseMove);
    }, 1000); // Delay mouse move handler setup

    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen flex items-center">
      {/* Financial data grid background - Reduced opacity and blur */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        {/* Simplified chart lines with reduced visual effects */}
        <div className="chart-line absolute left-0 top-1/4 w-full h-px bg-cyan-500/10"></div>
        <div className="chart-line absolute left-0 top-1/2 w-full h-px bg-cyan-500/10"></div>
        <div className="chart-line absolute left-0 top-3/4 w-full h-px bg-cyan-500/10"></div>

        {/* Reduced number of accent elements */}
        <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-red-500/30"></div>
        <div className="absolute top-2/3 left-1/2 w-2 h-2 rounded-full bg-cyan-500/30"></div>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
        {/* Left side with optimized chart visualization */}
        <div className="hidden lg:flex flex-col items-center justify-center">
          <div className="relative w-full">
            {/* Simplified price indicators */}
            <div className="absolute top-1/4 right-1/4 text-red-500 font-mono text-xl font-bold">
              326.91 ▼
            </div>
            <div className="absolute bottom-1/3 left-1/4 text-red-500 font-mono text-xl font-bold">
              597.55 ▼
            </div>

            {/* Optimized SVG chart */}
            <svg
              className="w-full h-[500px]"
              viewBox="0 0 500 400"
              xmlns="http://www.w3.org/2000/svg"
              style={{ contain: "paint" }}
            >
              <GridLines />
              <CandlestickChart />
              <DataPoints />

              {/* Simplified line chart */}
              <polyline
                points="25,180 49,160 73,170 97,155 121,180 145,165 169,190 193,170 217,160 241,150 265,165 289,145 313,160 337,140 361,155"
                fill="none"
                stroke="#0ff"
                strokeWidth="1.5"
                opacity="0.3"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>

        {/* Right side with optimized text content */}
        <div className="flex flex-col justify-center text-center lg:text-right">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            NextGEN <span className="text-primary">Investments</span>
          </h1>

          <p className="text-xl md:text-2xl font-medium mb-8">Build Wealth</p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-end gap-4">
            <button className="h-12 px-8 bg-primary text-primary-foreground rounded-md font-medium shadow-sm hover:bg-primary/90 active:scale-[0.98]">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
