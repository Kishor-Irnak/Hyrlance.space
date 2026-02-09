"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BadgeCheck, Heart, MapPin, Star, ThumbsDown } from "lucide-react";
import Link from "next/link";

interface JobProps {
  job: {
    id: string;
    title: string;
    description: string;
    postedTime: string;
    type: string;
    level: string;
    estBudget?: string;
    estTime?: string;
    featured?: boolean;
    skills: string[];
    client?: {
      paymentVerified: boolean;
      rating: number;
      spent: string;
      location: string;
    };
    proposals: string;
  };
}

export function JobCard({ job }: JobProps) {
  return (
    <Card className="hover:shadow-md transition-all cursor-pointer">
      <CardHeader className="p-3 sm:p-4 pb-2 space-y-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="text-[10px] sm:text-xs">
            Posted {job.postedTime}
          </span>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full hover:bg-muted text-muted-foreground"
            >
              <ThumbsDown className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="sr-only">Not interested</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full hover:bg-muted text-muted-foreground"
            >
              <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="sr-only">Save job</span>
            </Button>
          </div>
        </div>
        <Link href={`/job/${job.id}`} className="block group">
          <h3 className="font-semibold text-base sm:text-lg group-hover:underline text-foreground decoration-primary decoration-2 underline-offset-2">
            {job.title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 pt-0 space-y-3 sm:space-y-4">
        <div className="text-xs sm:text-sm text-muted-foreground flex flex-wrap gap-x-1">
          <span>{job.type}</span>
          <span>-</span>
          <span>{job.level}</span>
          <span>-</span>
          <span className="break-all">
            {job.estBudget
              ? `Est. Budget: ${job.estBudget}`
              : `Est. Time: ${job.estTime}`}
          </span>
        </div>
        <div className="text-xs sm:text-sm leading-relaxed">
          {job.description}
          <Link
            href={`/job/${job.id}`}
            className="text-primary hover:underline ml-1 font-medium"
          >
            more
          </Link>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {job.skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="font-normal text-[10px] sm:text-xs text-muted-foreground hover:text-foreground px-2 py-0.5"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      {job.client && (
        <CardFooter className="p-3 sm:p-4 pt-0 text-muted-foreground text-[10px] sm:text-xs flex flex-wrap gap-x-2 sm:gap-x-4 gap-y-1.5 sm:gap-y-2 items-center">
          {job.client.paymentVerified && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <BadgeCheck className="h-4 w-4 text-blue-500 fill-white" />
              <span>Payment verified</span>
            </div>
          )}
          {job.client.rating > 0 && (
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(job.client!.rating)
                        ? "fill-primary text-primary"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium text-foreground">
                {job.client.rating}
              </span>
            </div>
          )}
          <span className="font-medium text-foreground">
            {job.client.spent}
          </span>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{job.client.location}</span>
          </div>
        </CardFooter>
      )}
      <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-[10px] sm:text-xs text-muted-foreground">
        Proposals: {job.proposals}
      </div>
    </Card>
  );
}
