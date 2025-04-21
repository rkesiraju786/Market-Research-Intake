import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertWorkforceRequestSchema, insertConsultingRequestSchema, insertAppointmentSchema, insertStrategicSourcingRequestSchema } from "@shared/schema";
import { sendEmail, formatStrategicSourcingPlusConfirmation } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Workforce Reports Request API
  app.post("/api/requests/workforce", async (req, res) => {
    try {
      const validatedData = insertWorkforceRequestSchema.parse(req.body);
      const request = await storage.createWorkforceRequest(validatedData);
      res.status(201).json({ success: true, data: request });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating workforce request:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to create workforce request" 
        });
      }
    }
  });

  // Get all workforce requests
  app.get("/api/requests/workforce", async (req, res) => {
    try {
      const requests = await storage.getAllWorkforceRequests();
      res.json({ success: true, data: requests });
    } catch (error) {
      console.error("Error getting workforce requests:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to get workforce requests" 
      });
    }
  });

  // Consulting Reports Request API
  app.post("/api/requests/consulting", async (req, res) => {
    try {
      const validatedData = insertConsultingRequestSchema.parse(req.body);
      const request = await storage.createConsultingRequest(validatedData);
      res.status(201).json({ success: true, data: request });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating consulting request:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to create consulting request" 
        });
      }
    }
  });

  // Get all consulting requests
  app.get("/api/requests/consulting", async (req, res) => {
    try {
      const requests = await storage.getAllConsultingRequests();
      res.json({ success: true, data: requests });
    } catch (error) {
      console.error("Error getting consulting requests:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to get consulting requests" 
      });
    }
  });

  // Appointments API
  app.post("/api/appointments", async (req, res) => {
    try {
      const validatedData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(validatedData);
      res.status(201).json({ success: true, data: appointment });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating appointment:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to create appointment" 
        });
      }
    }
  });

  // Get all appointments
  app.get("/api/appointments", async (req, res) => {
    try {
      const appointments = await storage.getAllAppointments();
      res.json({ success: true, data: appointments });
    } catch (error) {
      console.error("Error getting appointments:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to get appointments" 
      });
    }
  });

  // Strategic Sourcing Request API
  app.post("/api/requests/strategic-sourcing", async (req, res) => {
    try {
      const validatedData = insertStrategicSourcingRequestSchema.parse(req.body);
      const request = await storage.createStrategicSourcingRequest(validatedData);
      res.status(201).json({ success: true, data: request });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating strategic sourcing request:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to create strategic sourcing request" 
        });
      }
    }
  });
  
  // Strategic Sourcing Plus Request API
  app.post("/api/requests/strategic-sourcing-plus", async (req, res) => {
    try {
      // For the Plus variant, we accept the roles and locations arrays directly
      // without strict validation since they have a dynamic structure
      const { reportType, variant, roles, locations, additionalNotes, email } = req.body;
      
      // Create a simplified version for database storage
      const validatedData = insertStrategicSourcingRequestSchema.parse({
        reportType,
        variant,
        // Store JSON stringified versions of the arrays
        challenges: ["detailed-form"],
        challengeDetails: JSON.stringify(roles),
        audience: ["detailed-form"],
        audienceDetails: JSON.stringify(locations),
        additionalInsights: additionalNotes ? ["custom-notes"] : [],
        insightDetails: additionalNotes || "",
        timeline: "standard"
      });
      
      // Save to database
      const request = await storage.createStrategicSourcingRequest(validatedData);
      
      // Send confirmation email if an email address is provided
      if (email) {
        try {
          // Format and send the email
          const emailHtml = formatStrategicSourcingPlusConfirmation(roles, locations, additionalNotes);
          await sendEmail(
            email,
            'Your Strategic Sourcing Plus Request Confirmation',
            emailHtml
          );
        } catch (emailError) {
          console.error("Failed to send confirmation email:", emailError);
          // Continue with the response even if email fails
        }
      }
      
      res.status(201).json({ success: true, data: request });
    } catch (error: any) {
      console.error("Error creating strategic sourcing plus request:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to create strategic sourcing plus request",
        error: error.message || "Unknown error occurred"
      });
    }
  });

  // Get all strategic sourcing requests
  app.get("/api/requests/strategic-sourcing", async (req, res) => {
    try {
      const requests = await storage.getAllStrategicSourcingRequests();
      res.json({ success: true, data: requests });
    } catch (error) {
      console.error("Error getting strategic sourcing requests:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to get strategic sourcing requests" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
