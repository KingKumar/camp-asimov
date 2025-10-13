// Edit this list to add/remove lessons.
// slug must be unique; videoUrl can be YouTube/Vimeo/embed or a direct MP4 link in /public/videos/*
export type CadLesson = {
  slug: string;
  title: string;
  duration?: string;
  videoUrl: string;
  description?: string;
  resources?: { label: string; href: string }[];
};

export const CAD_LESSONS: CadLesson[] = [
  {
    slug: "intro-fusion-360",
    title: "Intro to Fusion 360: UI, Projects, and Data",
    duration: "12:34",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_1",
    description: "Tour of Fusion 360 interface, project structure, and saving conventions for student teams.",
    resources: [
      { label: "Fusion 360 Educator Access", href: "https://www.autodesk.com/education/edu-software/overview" },
      { label: "Template Folder Layout (PDF)", href: "/cad/resources/folder-template.pdf" },
    ],
  },
  {
    slug: "sketch-constraints",
    title: "Sketching & Constraints: From Idea to Parametric",
    duration: "16:12",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_2",
    description: "Best practices for fully-constrained sketches, dimensions, and parametric control.",
    resources: [
      { label: "Constraint Cheat Sheet (PDF)", href: "/cad/resources/constraints.pdf" },
    ],
  },
  {
    slug: "assemblies-joints",
    title: "Assemblies & Joints: goBilda + REV Parts",
    duration: "14:05",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
    description: "Importing COTS parts, joints vs. as-built joints, and fitting REV/goBilda libraries.",
    resources: [
      { label: "goBilda STEP Library", href: "https://www.gobilda.com/downloads/" },
      { label: "REV Robotics CAD", href: "https://www.revrobotics.com/content/docs/" },
    ],
  },
  {
    slug: "manufacture-3dp-laser",
    title: "Manufacture: 3D Print & Laser Cut from Fusion",
    duration: "10:47",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_4",
    description: "Export workflows, tolerances, slicer handoff, and laser DXF best practices.",
    resources: [
      { label: "3DP Tolerance Guide (PDF)", href: "/cad/resources/3dp-tolerances.pdf" },
      { label: "Laser DXF Export Steps (PDF)", href: "/cad/resources/laser-dxf.pdf" },
    ],
  },
];
