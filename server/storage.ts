import { db } from './db';
import { eq } from 'drizzle-orm';
import { 
  users, 
  type User, 
  type InsertUser,
  workforceRequests,
  type WorkforceRequest,
  type InsertWorkforceRequest,
  consultingRequests,
  type ConsultingRequest,
  type InsertConsultingRequest,
  appointments,
  type Appointment,
  type InsertAppointment,
  strategicSourcingRequests,
  type StrategicSourcingRequest,
  type InsertStrategicSourcingRequest
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Workforce request methods
  createWorkforceRequest(request: InsertWorkforceRequest): Promise<WorkforceRequest>;
  getWorkforceRequest(id: number): Promise<WorkforceRequest | undefined>;
  getAllWorkforceRequests(): Promise<WorkforceRequest[]>;
  
  // Consulting request methods
  createConsultingRequest(request: InsertConsultingRequest): Promise<ConsultingRequest>;
  getConsultingRequest(id: number): Promise<ConsultingRequest | undefined>;
  getAllConsultingRequests(): Promise<ConsultingRequest[]>;
  
  // Strategic Sourcing request methods
  createStrategicSourcingRequest(request: InsertStrategicSourcingRequest): Promise<StrategicSourcingRequest>;
  getStrategicSourcingRequest(id: number): Promise<StrategicSourcingRequest | undefined>;
  getAllStrategicSourcingRequests(): Promise<StrategicSourcingRequest[]>;
  
  // Appointment methods
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointment(id: number): Promise<Appointment | undefined>;
  getAllAppointments(): Promise<Appointment[]>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Workforce request methods
  async createWorkforceRequest(insertRequest: InsertWorkforceRequest): Promise<WorkforceRequest> {
    const [request] = await db
      .insert(workforceRequests)
      .values({ 
        ...insertRequest, 
        createdAt: new Date() 
      })
      .returning();
    return request;
  }
  
  async getWorkforceRequest(id: number): Promise<WorkforceRequest | undefined> {
    const [request] = await db
      .select()
      .from(workforceRequests)
      .where(eq(workforceRequests.id, id));
    return request || undefined;
  }
  
  async getAllWorkforceRequests(): Promise<WorkforceRequest[]> {
    return await db.select().from(workforceRequests);
  }
  
  // Consulting request methods
  async createConsultingRequest(insertRequest: InsertConsultingRequest): Promise<ConsultingRequest> {
    const [request] = await db
      .insert(consultingRequests)
      .values({ 
        ...insertRequest, 
        createdAt: new Date() 
      })
      .returning();
    return request;
  }
  
  async getConsultingRequest(id: number): Promise<ConsultingRequest | undefined> {
    const [request] = await db
      .select()
      .from(consultingRequests)
      .where(eq(consultingRequests.id, id));
    return request || undefined;
  }
  
  async getAllConsultingRequests(): Promise<ConsultingRequest[]> {
    return await db.select().from(consultingRequests);
  }
  
  // Appointment methods
  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const [appointment] = await db
      .insert(appointments)
      .values({ 
        ...insertAppointment, 
        createdAt: new Date() 
      })
      .returning();
    return appointment;
  }
  
  async getAppointment(id: number): Promise<Appointment | undefined> {
    const [appointment] = await db
      .select()
      .from(appointments)
      .where(eq(appointments.id, id));
    return appointment || undefined;
  }
  
  async getAllAppointments(): Promise<Appointment[]> {
    return await db.select().from(appointments);
  }
  
  // Strategic Sourcing request methods
  async createStrategicSourcingRequest(insertRequest: InsertStrategicSourcingRequest): Promise<StrategicSourcingRequest> {
    const [request] = await db
      .insert(strategicSourcingRequests)
      .values({ 
        ...insertRequest,
        createdAt: new Date() 
      })
      .returning();
    return request;
  }
  
  async getStrategicSourcingRequest(id: number): Promise<StrategicSourcingRequest | undefined> {
    const [request] = await db
      .select()
      .from(strategicSourcingRequests)
      .where(eq(strategicSourcingRequests.id, id));
    return request || undefined;
  }
  
  async getAllStrategicSourcingRequests(): Promise<StrategicSourcingRequest[]> {
    return await db.select().from(strategicSourcingRequests);
  }
}

export const storage = new DatabaseStorage();
