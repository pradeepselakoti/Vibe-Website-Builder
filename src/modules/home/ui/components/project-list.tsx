"use client";

import Link from "next/link";
import { format } from "date-fns";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderIcon, ClockIcon } from "lucide-react";
import { Project } from "@/generated/prisma";

export const ProjectsList = () => {
  const trpc = useTRPC();
  
  const { data: projects } = useSuspenseQuery(
    trpc.projects.getMany.queryOptions()
  );

  // Type assertion since we know the shape from tRPC
  const typedProjects = projects as Project[];

  if (typedProjects.length === 0) {
    return (
      <section className="pb-20">
        <div className="text-center text-muted-foreground">
          <p>No projects yet. Create your first one above!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-20">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {typedProjects.map((project: Project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FolderIcon className="size-5" />
                {project.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <ClockIcon className="size-4" />
                {format(project.updatedAt, "MMM dd, yyyy")}
              </div>
              <Button asChild size="sm" className="w-full">
                <Link href={`/projects/${project.id}`}>
                  Open Project
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};