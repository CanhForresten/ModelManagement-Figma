import { mockApi } from './mockData';

const API_BASE_URL = '/api'; // TODO: Replace with actual API URL
const USE_MOCK_API = true; // Set to false when backend is ready

export interface Job {
  id: string;
  title: string;
  description: string;
  date: string;
  customer: string;
  location?: string;
  models?: Model[];
}

export interface Model {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  height?: number;
}

export interface Manager {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Expense {
  id: string;
  jobId: string;
  modelId: string;
  description: string;
  amount: number;
  date: string;
}

class ApiService {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('jwt_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  }

  // Manager endpoints
  async createModel(data: Omit<Model, 'id'>) {
    if (USE_MOCK_API) return mockApi.createModel(data);

    const response = await fetch(`${API_BASE_URL}/models`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create model');
    }

    return response.json();
  }

  async createManager(data: Omit<Manager, 'id'>) {
    if (USE_MOCK_API) return mockApi.createManager(data);

    const response = await fetch(`${API_BASE_URL}/managers`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create manager');
    }

    return response.json();
  }

  async createJob(data: Omit<Job, 'id' | 'models'>) {
    if (USE_MOCK_API) return mockApi.createJob(data);

    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create job');
    }

    return response.json();
  }

  async getAllJobs(): Promise<Job[]> {
    if (USE_MOCK_API) return mockApi.getAllJobs();

    const response = await fetch(`${API_BASE_URL}/jobs`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }

    return response.json();
  }

  async getJob(jobId: string): Promise<Job> {
    if (USE_MOCK_API) return mockApi.getJob(jobId);

    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch job');
    }

    return response.json();
  }

  async addModelToJob(jobId: string, modelId: string) {
    if (USE_MOCK_API) return mockApi.addModelToJob(jobId, modelId);

    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/models`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ modelId }),
    });

    if (!response.ok) {
      throw new Error('Failed to add model to job');
    }

    return response.json();
  }

  async removeModelFromJob(jobId: string, modelId: string) {
    if (USE_MOCK_API) return mockApi.removeModelFromJob(jobId, modelId);

    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/models/${modelId}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to remove model from job');
    }

    return response.json();
  }

  async getJobExpenses(jobId: string): Promise<Expense[]> {
    if (USE_MOCK_API) return mockApi.getJobExpenses(jobId);

    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/expenses`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch expenses');
    }

    return response.json();
  }

  // Model endpoints
  async getMyJobs(): Promise<Job[]> {
    if (USE_MOCK_API) return mockApi.getMyJobs();

    const response = await fetch(`${API_BASE_URL}/my-jobs`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch my jobs');
    }

    return response.json();
  }

  async addExpense(data: Omit<Expense, 'id'>) {
    if (USE_MOCK_API) return mockApi.addExpense(data);

    const response = await fetch(`${API_BASE_URL}/expenses`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to add expense');
    }

    return response.json();
  }

  async getAllModels(): Promise<Model[]> {
    if (USE_MOCK_API) return mockApi.getAllModels();

    const response = await fetch(`${API_BASE_URL}/models`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch models');
    }

    return response.json();
  }
}

export const api = new ApiService();
