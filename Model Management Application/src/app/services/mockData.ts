import { Job, Model, Manager, Expense } from './api';

// Mock data storage
let mockJobs: Job[] = [
  {
    id: '1',
    title: 'H&M Forårskollektion',
    description: 'Fotosession til H&Ms nye forårskollektion 2026',
    date: '2026-05-15',
    customer: 'H&M',
    location: 'København Studio A',
    models: [
      {
        id: '2',
        email: 'model@example.com',
        firstName: 'Model',
        lastName: 'Jensen',
        height: 178,
      },
    ],
  },
  {
    id: '2',
    title: 'Vero Moda Kampagne',
    description: 'Online kampagne til sommerkollektionen',
    date: '2026-06-01',
    customer: 'Vero Moda',
    location: 'Aarhus',
    models: [],
  },
];

let mockModels: Model[] = [
  {
    id: '2',
    email: 'model@example.com',
    firstName: 'Model',
    lastName: 'Jensen',
    phone: '+45 12345678',
    height: 178,
  },
  {
    id: '3',
    email: 'sarah@example.com',
    firstName: 'Sarah',
    lastName: 'Nielsen',
    phone: '+45 23456789',
    height: 182,
  },
  {
    id: '4',
    email: 'lucas@example.com',
    firstName: 'Lucas',
    lastName: 'Andersen',
    phone: '+45 34567890',
    height: 188,
  },
];

let mockManagers: Manager[] = [
  {
    id: '1',
    email: 'manager@example.com',
    firstName: 'Manager',
    lastName: 'Hansen',
  },
];

let mockExpenses: Expense[] = [
  {
    id: '1',
    jobId: '1',
    modelId: '2',
    description: 'Transport til location',
    amount: 250.50,
    date: '2026-05-15',
  },
];

let nextId = 5;

export const mockApi = {
  async getAllJobs(): Promise<Job[]> {
    await delay();
    return [...mockJobs];
  },

  async getJob(jobId: string): Promise<Job> {
    await delay();
    const job = mockJobs.find(j => j.id === jobId);
    if (!job) throw new Error('Job not found');
    return { ...job };
  },

  async getMyJobs(): Promise<Job[]> {
    await delay();
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    return mockJobs.filter(job =>
      job.models?.some(model => model.id === userId)
    );
  },

  async createJob(data: Omit<Job, 'id' | 'models'>): Promise<Job> {
    await delay();
    const newJob: Job = {
      ...data,
      id: String(nextId++),
      models: [],
    };
    mockJobs.push(newJob);
    return newJob;
  },

  async createModel(data: Omit<Model, 'id'>): Promise<Model> {
    await delay();
    const newModel: Model = {
      ...data,
      id: String(nextId++),
    };
    mockModels.push(newModel);
    return newModel;
  },

  async createManager(data: Omit<Manager, 'id'>): Promise<Manager> {
    await delay();
    const newManager: Manager = {
      ...data,
      id: String(nextId++),
    };
    mockManagers.push(newManager);
    return newManager;
  },

  async getAllModels(): Promise<Model[]> {
    await delay();
    return [...mockModels];
  },

  async addModelToJob(jobId: string, modelId: string): Promise<void> {
    await delay();
    const job = mockJobs.find(j => j.id === jobId);
    const model = mockModels.find(m => m.id === modelId);

    if (!job || !model) throw new Error('Job or model not found');

    if (!job.models) job.models = [];
    if (!job.models.some(m => m.id === modelId)) {
      job.models.push(model);
    }
  },

  async removeModelFromJob(jobId: string, modelId: string): Promise<void> {
    await delay();
    const job = mockJobs.find(j => j.id === jobId);

    if (!job) throw new Error('Job not found');

    if (job.models) {
      job.models = job.models.filter(m => m.id !== modelId);
    }
  },

  async getJobExpenses(jobId: string): Promise<Expense[]> {
    await delay();
    return mockExpenses.filter(e => e.jobId === jobId);
  },

  async addExpense(data: Omit<Expense, 'id'>): Promise<Expense> {
    await delay();
    const newExpense: Expense = {
      ...data,
      id: String(nextId++),
    };
    mockExpenses.push(newExpense);
    return newExpense;
  },
};

function delay(ms: number = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
