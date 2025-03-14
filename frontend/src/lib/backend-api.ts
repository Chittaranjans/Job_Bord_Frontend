import { mockCompanies, mockUsers, mockJobs } from "@/data/mock/companies";

// Backend API configuration
const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};


async function fetchFromBackend<T>(endpoint: string, fallback: any, options = {}): Promise<T> {
  try {
    const url = `${API_CONFIG.baseUrl}${endpoint}`;
    console.log(`Fetching from backend: ${url}`);
    
    const response = await fetch(url, {
      headers: API_CONFIG.headers,
      ...options
    });
    
    if (!response.ok) {
      console.error(`Backend API error: ${response.status} ${response.statusText}`);
      throw new Error(`Backend API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from backend API (${endpoint}):`, error);
    return fallback;
  }
}

// Backend API endpoints with fallback to mock data
export const backendApi = {
  // Companies
  getCompanies: () => fetchFromBackend('/api/v1/companies', mockCompanies),
  getCompanyById: (id: string) => 
    fetchFromBackend(`/api/v1/companies/${id}`, mockCompanies.find(company => company.id === id) || mockCompanies[0]),
  
  // Jobs
  getJobs: () => fetchFromBackend('/api/v1/jobs', mockJobs),
  getJobById: (id: string) => 
    fetchFromBackend(`/api/v1/jobs/${id}`, mockJobs.find(job => job.id === id) || mockJobs[0]),
  
  // Profiles/Users
  getProfiles: () => fetchFromBackend('/api/v1/profiles', mockUsers),
  getProfileById: (id: string) => 
    fetchFromBackend(`/api/v1/profiles/${id}`, mockUsers.find(user => user.id === id) || mockUsers[0]),
  
  // Company relations
  getJobsByCompany: (companyId: string) => 
    fetchFromBackend(`/api/v1/companies/${companyId}/jobs`, mockJobs.filter(job => job.company_id === companyId)),
  getUsersByCompany: (companyId: string) => 
    fetchFromBackend(`/api/v1/companies/${companyId}/users`, mockUsers.filter(user => user.company_id === companyId))
};