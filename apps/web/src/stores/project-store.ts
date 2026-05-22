import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Project {
  id: string;
  name: string;
  url: string;
  createdAt: string;
}

interface ProjectState {
  activeProject: Project | null;
  projects: Project[];
  setActiveProject: (project: Project | null) => void;
  setProjects: (projects: Project[]) => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      activeProject: null,
      projects: [],
      setActiveProject: (project) => set({ activeProject: project }),
      setProjects: (projects) => set({ projects }),
    }),
    {
      name: "project-storage",
    }
  )
);
