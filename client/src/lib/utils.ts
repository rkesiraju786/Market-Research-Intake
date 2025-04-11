import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const standardReportTypes = [
  {
    id: "strategic-sourcing",
    title: "Strategic Sourcing",
    description: "Analyze talent pools and sourcing channels to optimize recruitment strategies.",
    icon: "clipboard-list",
  },
  {
    id: "location-analysis",
    title: "Location Analysis",
    description: "Evaluate labor markets across different geographic locations for expansion planning.",
    icon: "map-pin",
  },
  {
    id: "competitor-analysis",
    title: "Competitor Analysis",
    description: "Benchmark against competitors' talent acquisition and retention strategies.",
    icon: "line-chart",
  },
  {
    id: "evp-analysis",
    title: "EVP Analysis",
    description: "Evaluate and optimize your employee value proposition for target talent segments.",
    icon: "dollar-sign",
  },
  {
    id: "diversity-analysis",
    title: "Diversity Analysis",
    description: "Assess diversity metrics and identify opportunities for inclusive hiring practices.",
    icon: "users",
  },
  {
    id: "job-posting-analysis",
    title: "Job Posting Analysis",
    description: "Optimize job descriptions and posting strategies based on market response data.",
    icon: "clipboard",
  },
  {
    id: "hourly-wage-analysis",
    title: "Hourly Wage Analysis",
    description: "Comprehensive wage data for hourly workers across industries and regions.",
    icon: "dollar-sign",
  },
  {
    id: "talent-trends",
    title: "Talent Trends Report",
    description: "Analysis of emerging skills, career paths, and workforce mobility patterns.",
    icon: "trending-up",
  },
];

export const getAvailableTimes = (date: Date): string[] => {
  // In a real application, this would fetch from an API
  return ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"];
};
