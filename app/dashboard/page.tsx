import { AppSidebar } from "@/components/app-sidebar";
import { JobFeed } from "@/components/job-feed";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SlidersHorizontal } from "lucide-react";
import jobsData from "./data.json";

export default function Page() {
  const jobs = jobsData;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Find Work</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 md:gap-6 p-3 sm:p-4 md:p-8 max-w-5xl mx-auto w-full">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Jobs you might like
            </h1>
          </div>

          <Tabs defaultValue="best-matches" className="w-full">
            <div className="flex flex-col gap-3 sm:gap-4 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <TabsList className="grid w-full grid-cols-3 sm:w-auto sm:inline-flex">
                  <TabsTrigger
                    value="best-matches"
                    className="text-xs sm:text-sm"
                  >
                    Best Matches
                  </TabsTrigger>
                  <TabsTrigger
                    value="most-recent"
                    className="text-xs sm:text-sm"
                  >
                    Most Recent
                  </TabsTrigger>
                  <TabsTrigger
                    value="saved-jobs"
                    className="text-xs sm:text-sm"
                  >
                    Saved Jobs
                  </TabsTrigger>
                </TabsList>
                {/* Filter Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 h-9 border-primary text-primary hover:bg-primary/5 w-full sm:w-auto"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Browse jobs that match your experience to a client's hiring
              preferences. Ordered by most relevant.
            </p>

            <TabsContent value="best-matches" className="space-y-0 mt-0">
              <JobFeed jobs={jobs} />
            </TabsContent>
            <TabsContent value="most-recent">
              <div className="border rounded-xl bg-card text-card-foreground shadow-sm overflow-hidden p-8 text-center text-muted-foreground">
                No recent jobs found.
              </div>
            </TabsContent>
            <TabsContent value="saved-jobs">
              <div className="border rounded-xl bg-card text-card-foreground shadow-sm overflow-hidden p-8 text-center text-muted-foreground">
                No saved jobs yet.
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
