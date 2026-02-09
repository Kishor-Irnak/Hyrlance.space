"use client";

import { JobCard } from "@/components/job-card";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import { useState } from "react";

interface JobFeedProps {
  jobs: any[];
}

export function JobFeed({ jobs }: JobFeedProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = jobs.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {currentJobs.map((job) => (
          <JobCard key={job.id} job={job} />
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
    </div>
  );
}
