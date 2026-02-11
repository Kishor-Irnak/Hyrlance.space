"use client";

import { Job, JobCard } from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MapPin,
  Clock,
  Briefcase,
  DollarSign,
  Star,
  BadgeCheck,
} from "lucide-react";
import { useState } from "react";

interface JobFeedProps {
  jobs: Job[];
}

export function JobFeed({ jobs }: JobFeedProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = jobs.slice(startIndex, endIndex);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {currentJobs.map((job) => (
          <JobCard key={job.id} job={job} onSelect={handleJobClick} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 px-2 py-3 sm:py-0">
        <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left order-2 sm:order-1">
          {jobs.length > 0 ? (
            <>
              {startIndex + 1}-{Math.min(endIndex, jobs.length)} of{" "}
              {jobs.length} row(s) selected.
            </>
          ) : (
            "No rows selected."
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 lg:gap-8 order-1 sm:order-2 w-full sm:w-auto">
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            <p className="text-xs sm:text-sm font-medium hidden sm:block">
              Rows per page
            </p>
            <Select
              value={`${itemsPerPage}`}
              onValueChange={(value) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={itemsPerPage} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-center text-xs sm:text-sm font-medium min-w-[80px] sm:min-w-[100px]">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-7 w-7 sm:h-8 sm:w-8 p-0"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-7 w-7 sm:h-8 sm:w-8 p-0"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
        <DrawerContent className="h-full sm:max-w-md w-full">
          {selectedJob && (
            <>
              <DrawerHeader className="border-b px-6 py-4">
                <DrawerTitle className="text-xl">
                  {selectedJob.title}
                </DrawerTitle>
                <DrawerDescription className="flex items-center gap-1 mt-1">
                  Posted {selectedJob.postedTime}
                </DrawerDescription>
              </DrawerHeader>

              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5" /> Job Type
                    </p>
                    <p className="font-medium">{selectedJob.type}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground flex items-center gap-1">
                      <BadgeCheck className="h-3.5 w-3.5" /> Experience Level
                    </p>
                    <p className="font-medium">{selectedJob.level}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5" /> Budget
                    </p>
                    <p className="font-medium">
                      {selectedJob.estBudget ||
                        selectedJob.estTime ||
                        "Negotiable"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> Posted
                    </p>
                    <p className="font-medium">{selectedJob.postedTime}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Description</h4>
                  <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {selectedJob.description}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="font-normal"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedJob.client && (
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-medium text-sm text-muted-foreground mb-3">
                      About the Client
                    </h4>
                    <div className="space-y-2 text-sm">
                      {selectedJob.client.paymentVerified && (
                        <div className="flex items-center gap-2">
                          <BadgeCheck className="h-4 w-4 text-blue-500 fill-blue-100" />
                          <span>Payment Method Verified</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${
                                i < Math.floor(selectedJob.client!.rating)
                                  ? "fill-primary text-primary"
                                  : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-medium">
                          {selectedJob.client.rating} stars
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedJob.client.spent} spent</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedJob.client.location}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <DrawerFooter className="border-t px-6 py-4">
                <Button size="lg" className="w-full">
                  Apply Now
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">
                    Close
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
