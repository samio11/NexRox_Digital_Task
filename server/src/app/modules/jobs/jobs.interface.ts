import { Types } from "mongoose";

export enum ESkills {
  HTML = "HTML",
  CSS = "CSS",
  JavaScript = "JavaScript",
  TypeScript = "TypeScript",
  React = "React",
  NextJS = "Next.js",
  Angular = "Angular",
  Vue = "Vue.js",
  NodeJS = "Node.js",
  ExpressJS = "Express.js",
  NestJS = "NestJS",
  MongoDB = "MongoDB",
  PostgreSQL = "PostgreSQL",
  MySQL = "MySQL",
  GraphQL = "GraphQL",
  AWS = "AWS",
  Docker = "Docker",
  Git = "Git",
  Figma = "Figma",
  UIUX = "UI/UX Design",
}

export interface IJob {
  _id: string;
  user: Types.ObjectId;
  title: string;
  description: string;
  jobType: "Fixed Price" | "Hourly";
  minBudget: number;
  maxBudget: number;
  skillsRequired: ESkills;
  level: "Junior" | "Mid" | "Senior";
  locationType: "Remote" | "On-site" | "Hybrid";
}
