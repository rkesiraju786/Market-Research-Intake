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
  type InsertAppointment
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
  
  // Appointment methods
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointment(id: number): Promise<Appointment | undefined>;
  getAllAppointments(): Promise<Appointment[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private workforceRequests: Map<number, WorkforceRequest>;
  private consultingRequests: Map<number, ConsultingRequest>;
  private appointments: Map<number, Appointment>;
  
  private userCurrentId: number;
  private workforceRequestCurrentId: number;
  private consultingRequestCurrentId: number;
  private appointmentCurrentId: number;

  constructor() {
    this.users = new Map();
    this.workforceRequests = new Map();
    this.consultingRequests = new Map();
    this.appointments = new Map();
    
    this.userCurrentId = 1;
    this.workforceRequestCurrentId = 1;
    this.consultingRequestCurrentId = 1;
    this.appointmentCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Workforce request methods
  async createWorkforceRequest(insertRequest: InsertWorkforceRequest): Promise<WorkforceRequest> {
    const id = this.workforceRequestCurrentId++;
    const now = new Date();
    const request: WorkforceRequest = { 
      ...insertRequest, 
      id,
      createdAt: now
    };
    this.workforceRequests.set(id, request);
    return request;
  }
  
  async getWorkforceRequest(id: number): Promise<WorkforceRequest | undefined> {
    return this.workforceRequests.get(id);
  }
  
  async getAllWorkforceRequests(): Promise<WorkforceRequest[]> {
    return Array.from(this.workforceRequests.values());
  }
  
  // Consulting request methods
  async createConsultingRequest(insertRequest: InsertConsultingRequest): Promise<ConsultingRequest> {
    const id = this.consultingRequestCurrentId++;
    const now = new Date();
    const request: ConsultingRequest = { 
      ...insertRequest, 
      id,
      createdAt: now
    };
    this.consultingRequests.set(id, request);
    return request;
  }
  
  async getConsultingRequest(id: number): Promise<ConsultingRequest | undefined> {
    return this.consultingRequests.get(id);
  }
  
  async getAllConsultingRequests(): Promise<ConsultingRequest[]> {
    return Array.from(this.consultingRequests.values());
  }
  
  // Appointment methods
  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = this.appointmentCurrentId++;
    const now = new Date();
    const appointment: Appointment = { 
      ...insertAppointment, 
      id,
      createdAt: now
    };
    this.appointments.set(id, appointment);
    return appointment;
  }
  
  async getAppointment(id: number): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }
  
  async getAllAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }
}

export const storage = new MemStorage();
