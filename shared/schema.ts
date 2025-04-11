import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Schema for workforce reports
export const workforceRequests = pgTable("workforce_requests", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  reportType: text("report_type").notNull(),
  requirements: text("requirements"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertWorkforceRequestSchema = createInsertSchema(workforceRequests).omit({
  id: true,
  createdAt: true,
});

export type InsertWorkforceRequest = z.infer<typeof insertWorkforceRequestSchema>;
export type WorkforceRequest = typeof workforceRequests.$inferSelect;

// Schema for consulting reports
export const consultingRequests = pgTable("consulting_requests", {
  id: serial("id").primaryKey(),
  problemStatement: text("problem_statement").notNull(),
  currentSolution: text("current_solution").notNull(),
  supportData: boolean("support_data").default(false),
  supportInsights: boolean("support_insights").default(false),
  supportConsulting: boolean("support_consulting").default(false),
  supportOther: boolean("support_other").default(false),
  supportOtherText: text("support_other_text"),
  keyQuestions: text("key_questions").notNull(),
  decisionsOutcomes: text("decisions_outcomes").notNull(),
  timelineStart: text("timeline_start"),
  timelineCompletion: text("timeline_completion"),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertConsultingRequestSchema = createInsertSchema(consultingRequests).omit({
  id: true,
  createdAt: true,
});

export type InsertConsultingRequest = z.infer<typeof insertConsultingRequestSchema>;
export type ConsultingRequest = typeof consultingRequests.$inferSelect;

// Schema for call scheduling
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  businessNeed: text("business_need").notNull(),
  supportNeeded: text("support_needed").notNull(),
  keyQuestions: text("key_questions").notNull(),
  decisionsOutcomes: text("decisions_outcomes").notNull(),
  timeline: text("timeline"),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  appointmentDate: text("appointment_date").notNull(),
  appointmentTime: text("appointment_time").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  createdAt: true,
});

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;
