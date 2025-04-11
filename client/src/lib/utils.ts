import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type HoverDetails = {
  definition: string;
  useCases: string[];
};

export type ExtendedReport = {
  id: string;
  title: string;
  description: string;
  icon: string;
  hoverDetails?: HoverDetails;
  variants?: Record<string, any>;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const standardReportTypes: ExtendedReport[] = [
  {
    id: "strategic-sourcing",
    title: "Strategic Sourcing",
    description: "Analyze talent pools and sourcing channels to optimize recruitment strategies.",
    icon: "clipboard-list",
    hoverDetails: {
      definition: "A comprehensive analysis of talent supply, demand, salary, and diversity data to help organizations make informed decisions about where and how to recruit talent.",
      useCases: [
        "Identifying untapped talent pools to meet hiring goals",
        "Optimizing recruiting budget allocation based on market data",
        "Supporting location strategy decisions with empirical workforce data"
      ]
    },
    variants: {
      basic: {
        title: "Strategic Sourcing",
        definition: "A foundational talent market analysis that provides key metrics on talent availability, competition, and costs.",
        benefits: [
          "Identify potential talent pools",
          "Understand talent supply vs. demand dynamics",
          "Make data-driven recruiting decisions"
        ],
        useCases: [
          "Planning recruitment campaigns",
          "Justifying budget allocations",
          "Identifying hiring challenges"
        ],
        contents: [
          "Talent Supply",
          "Talent Demand",
          "Talent Supply-Demand Ratio",
          "Talent Cost (Median)",
          "Top Competitors Housing and Hiring Talent",
          "Top Titles",
          "Top Skills"
        ],
        sampleReportUrl: "/sample-reports/strategic-sourcing-basic.pdf"
      },
      plus: {
        title: "Strategic Sourcing Plus",
        definition: "An advanced talent market analysis with expanded metrics and deeper insights into talent demographics and costs.",
        benefits: [
          "All benefits of the basic version",
          "More granular cost analysis",
          "Diversity insights for inclusive hiring",
          "Alternative location recommendations"
        ],
        useCases: [
          "DEI initiative planning",
          "Cross-market talent strategy",
          "Detailed compensation structuring",
          "Experience-based recruiting plans"
        ],
        contents: [
          "Everything in Basic version",
          "Alternate Location Identification",
          "Talent Supply by Experience",
          "Talent Cost by Percentile (25th, 50th, 90th)",
          "Talent Demand by Experience (TN covered countries only)",
          "Talent Supply by Industry",
          "Diversity"
        ],
        sampleReportUrl: "/sample-reports/strategic-sourcing-plus.pdf"
      }
    }
  },
  {
    id: "location-analysis",
    title: "Location Analysis",
    description: "Evaluate labor markets across different geographic locations for expansion planning.",
    icon: "map-pin",
    hoverDetails: {
      definition: "A detailed assessment of talent markets across multiple locations to support site selection, expansion planning, and distributed workforce strategies.",
      useCases: [
        "Evaluating new office or facility locations based on talent availability",
        "Comparing talent costs across different markets",
        "Planning geographic expansion with talent as a primary factor"
      ]
    },
  },
  {
    id: "competitor-analysis",
    title: "Competitor Analysis",
    description: "Benchmark against competitors' talent acquisition and retention strategies.",
    icon: "line-chart",
    hoverDetails: {
      definition: "An in-depth comparison of your organization's talent strategies against key competitors, identifying competitive advantages and areas for improvement.",
      useCases: [
        "Benchmarking compensation and benefits packages to remain competitive",
        "Understanding competitor hiring patterns and talent sources",
        "Developing strategies to attract talent from competitors"
      ]
    },
  },
  {
    id: "evp-analysis",
    title: "EVP Analysis",
    description: "Evaluate and optimize your employee value proposition for target talent segments.",
    icon: "dollar-sign",
    hoverDetails: {
      definition: "A comprehensive assessment of your Employee Value Proposition (EVP) against market expectations and competitor offerings to attract and retain key talent.",
      useCases: [
        "Developing targeted EVP strategies for different talent segments",
        "Identifying the most valued benefits and perks for specific roles",
        "Optimizing total compensation packages to improve hiring outcomes"
      ]
    },
  },
  {
    id: "diversity-analysis",
    title: "Diversity Analysis",
    description: "Assess diversity metrics and identify opportunities for inclusive hiring practices.",
    icon: "users",
    hoverDetails: {
      definition: "A detailed analysis of workforce diversity metrics and labor market demographics to support inclusive hiring and build a more diverse talent pipeline.",
      useCases: [
        "Setting realistic diversity hiring goals based on market availability",
        "Identifying untapped diverse talent pools in your industry",
        "Supporting DEI initiatives with data-driven strategies"
      ]
    },
  },
  {
    id: "job-posting-analysis",
    title: "Job Posting Analysis",
    description: "Optimize job descriptions and posting strategies based on market response data.",
    icon: "clipboard",
    hoverDetails: {
      definition: "A comprehensive analysis of job posting performance, including engagement metrics, conversion rates, and content optimization recommendations.",
      useCases: [
        "Improving job posting conversion rates with data-backed language changes",
        "Optimizing job distribution channels for maximum visibility",
        "Benchmarking posting performance against industry standards"
      ]
    },
  },
  {
    id: "hourly-wage-analysis",
    title: "Hourly Wage Analysis",
    description: "Comprehensive wage data for hourly workers across industries and regions.",
    icon: "dollar-sign",
    hoverDetails: {
      definition: "Detailed analysis of hourly wage trends, compensation bands, and benefits packages for front-line and hourly workers across various industries.",
      useCases: [
        "Setting competitive wage rates for hourly positions",
        "Developing region-specific compensation strategies",
        "Planning for minimum wage increases and labor cost changes"
      ]
    },
  },
  {
    id: "talent-trends",
    title: "Talent Trends Report",
    description: "Analysis of emerging skills, career paths, and workforce mobility patterns.",
    icon: "trending-up",
    hoverDetails: {
      definition: "A forward-looking analysis of talent market trends, including emerging skills, changing career paths, and evolving candidate expectations.",
      useCases: [
        "Proactively planning for future talent needs and skill gaps",
        "Understanding how career paths are evolving in your industry",
        "Developing skills-based hiring and development strategies"
      ]
    },
  },
];

export const getAvailableTimes = (date: Date): string[] => {
  // In a real application, this would fetch from an API
  return ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"];
};
