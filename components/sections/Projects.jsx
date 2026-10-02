"use client";

import React from "react";
import ProjectNotebook from "@/components/projects/ProjectNotebook";
import { projects } from "@/lib/mockData";

export default function Projects() {
  return (
    <section
      id="work"
      className="relative w-full py-28 border-t border-border bg-bg-primary text-text-primary"
    >
      <div className="max-w-[1240px] mx-auto px-6">
        <ProjectNotebook allProjects={projects} showHeader={true} />
      </div>
    </section>
  );
}
