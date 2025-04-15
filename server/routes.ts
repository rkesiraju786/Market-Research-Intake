import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertWorkforceRequestSchema, insertConsultingRequestSchema, insertAppointmentSchema } from "@shared/schema";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve the static HTML file
  app.get('/static', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'client/static.html'));
  });
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

  const httpServer = createServer(app);

  return httpServer;
}
