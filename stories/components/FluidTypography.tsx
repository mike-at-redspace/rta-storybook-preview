import type React from "react";
import { useEffect, useState } from "react";

/** QHD width; content is centred and never wider than this (2560×1440). */
const CONTENT_MAX_WIDTH_PX = 2560;

/** Container width range for fluid type: scale linearly from min to max over this width. */
const FLUID_WIDTH_MIN_PX = 320;
const FLUID_WIDTH_MAX_PX = 1920;
const FLUID_WIDTH_DIFF_PX = FLUID_WIDTH_MAX_PX - FLUID_WIDTH_MIN_PX;

/** Fluid fontSize using container query (100cqw). Best fit for each device when inside RTA viewport. */
function fluidClampCqw(minRem: number, maxRem: number): string {
  const slope = maxRem - minRem;
  return `clamp(${minRem}rem, calc(${minRem}rem + ${slope} * (100cqw - ${FLUID_WIDTH_MIN_PX}px) / ${FLUID_WIDTH_DIFF_PX}), ${maxRem}rem)`;
}

/** Dark container: full viewport, dark bg, light text. Query container so fluid type uses container width (best fit per device). */
const CONTAINER_STYLE: React.CSSProperties = {
  containerType: "inline-size",
  containerName: "fluid-type",
  width: "100%",
  minHeight: "100vh",
  background: "#1a1a1a",
  color: "#e8e8e8",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

/** Centred inner container constrained to QHD width. */
const CENTRED_STYLE: React.CSSProperties = {
  width: "100%",
  maxWidth: CONTENT_MAX_WIDTH_PX,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const SECTION_STYLE: React.CSSProperties = {
  width: "100%",
  maxWidth: "90%",
  padding: "1rem 1.5rem",
  boxSizing: "border-box",
};

const HEADER_STYLE: React.CSSProperties = {
  fontFamily: "system-ui, sans-serif",
  fontSize: fluidClampCqw(0.85, 1),
  color: "#999",
  marginBottom: "0.5rem",
  letterSpacing: "0.02em",
};

const INTRO_STYLE: React.CSSProperties = {
  fontFamily: "system-ui, sans-serif",
  fontSize: fluidClampCqw(1, 1.25),
  lineHeight: 1.5,
  color: "#b0b0b0",
  marginBottom: "2rem",
};

const headingStyles: Record<number, React.CSSProperties> = {
  1: {
    fontSize: fluidClampCqw(3, 10),
    fontWeight: 700,
    lineHeight: 1.1,
    margin: "0 0 0.5rem",
  },
  2: {
    fontSize: fluidClampCqw(2.25, 7.5),
    fontWeight: 600,
    lineHeight: 1.15,
    margin: "2rem 0 0.5rem",
  },
  3: {
    fontSize: fluidClampCqw(1.75, 5.5),
    fontWeight: 600,
    lineHeight: 1.2,
    margin: "1.5rem 0 0.5rem",
  },
  4: {
    fontSize: fluidClampCqw(1.5, 4),
    fontWeight: 500,
    lineHeight: 1.3,
    margin: "1.25rem 0 0.5rem",
  },
  5: {
    fontSize: fluidClampCqw(1.1, 2.5),
    fontWeight: 500,
    lineHeight: 1.35,
    margin: "1rem 0 0.5rem",
  },
  6: {
    fontSize: fluidClampCqw(0.9, 1.5),
    fontFamily: "ui-monospace, monospace",
    fontWeight: 400,
    lineHeight: 1.4,
    margin: "0.75rem 0 0.5rem",
  },
};

const DESC_STYLE: React.CSSProperties = {
  fontFamily: "system-ui, sans-serif",
  fontSize: fluidClampCqw(0.9, 1),
  lineHeight: 1.5,
  color: "#a0a0a0",
  margin: "0 0 0.25rem",
};

const CLAMP_STYLE: React.CSSProperties = {
  fontFamily: "ui-monospace, monospace",
  fontSize: "0.75rem",
  color: "#666",
  marginBottom: "0.5rem",
};

const DIMS_STYLE: React.CSSProperties = {
  fontFamily: "ui-monospace, monospace",
  fontSize: "0.8rem",
  color: "#555",
  marginTop: "2rem",
  paddingTop: "1rem",
  borderTop: "1px solid #333",
};

const sections: Array<{
  level: 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
  desc: string;
  clamp: string;
}> = [
  {
    level: 1,
    title: "Fortississimo",
    desc: "The grand statement. Used for primary titles. Maximum impact.",
    clamp: "Clamp(3rem - 10rem)",
  },
  {
    level: 2,
    title: "Molto Vivace",
    desc: "Major sections. Bold and authoritative, yet subservient to the title.",
    clamp: "Clamp(2.25rem - 7.5rem)",
  },
  {
    level: 3,
    title: "The Exposition",
    desc: "Subsection headers. Elegant and distinct. Bridge between display and body.",
    clamp: "Clamp(1.75rem - 5.5rem)",
  },
  {
    level: 4,
    title: "Andante Moderato",
    desc: "UI Labels & Cards. Sans-serif for legibility at smaller sizes.",
    clamp: "Clamp(1.5rem - 4rem)",
  },
  {
    level: 5,
    title: "String Section (Pizzicato)",
    desc: "Metadata & Subtitles. Subtle, refined, and purely functional.",
    clamp: "Clamp(1.1rem - 2.5rem)",
  },
  {
    level: 6,
    title: "track_id: 0924",
    desc: "Technical Data. Monospaced for precision. The whisper of the layout.",
    clamp: "Clamp(0.9rem - 1.5rem)",
  },
];

/** Responsive typography demo with fluid type scale. Resize the viewport or use RTA Preview to see scale and rhythm. */
export function FluidTypography() {
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div style={CONTAINER_STYLE}>
      <div style={CENTRED_STYLE}>
        <section style={SECTION_STYLE}>
          <p style={HEADER_STYLE} aria-hidden>
            𝄞 𝄢 Responsive Typography Demo
          </p>
          <h1 style={headingStyles[1]}>Overture</h1>
          <p style={INTRO_STYLE}>
            A study in scale, rhythm, and proportion. Resize your viewport to conduct the layout.
          </p>
          {sections.map(({ level, title, desc, clamp }) => {
            const Tag = `h${level}` as keyof JSX.IntrinsicElements;
            return (
              <div key={level}>
                <Tag style={headingStyles[level]}>{title}</Tag>
                <p style={DESC_STYLE}>{desc}</p>
                <p style={CLAMP_STYLE}>{clamp}</p>
              </div>
            );
          })}

          <p style={DIMS_STYLE} aria-live="polite">
            W: {dims.w} | H: {dims.h}
          </p>
        </section>
      </div>
    </div>
  );
}
