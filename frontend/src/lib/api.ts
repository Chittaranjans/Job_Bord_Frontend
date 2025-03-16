// src/lib/api.ts
import { mockCompanies, mockUsers, mockJobs } from "@/data/mock/companies";

function getBaseUrl() {
  // During static build/export, never attempt API calls
  if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
    return null;
  }
  
  // Get the API URL from environment variables
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // If there's no URL configured, return null to signal use of mock data
  if (!apiUrl || apiUrl.trim() === '') {
    return null;
  }
  
  return apiUrl;
}

export async function fetchCompanies() {
  const baseUrl = getBaseUrl();
  
  // If no API URL is configured or during build, use mock data immediately
  if (baseUrl === null) {
    return mockCompanies;
  }
  
  try {
    const response = await fetch(`${baseUrl}/api/v1/companies`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('Using mock data due to error:', error);
    return mockCompanies;
  }
}

export async function fetchCompanyById(id: string) {
  const baseUrl = getBaseUrl();
  
  // If no API URL is configured or during build, use mock data immediately
  if (baseUrl === null) {
    return mockCompanies.find(company => company.id === id) || mockCompanies[0];
  }
  
  try {
    const response = await fetch(`${baseUrl}/api/v1/companies/${id}`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('Using mock data due to error:', error);
    return mockCompanies.find(company => company.id === id) || mockCompanies[0];
  }
}

export async function fetchUsers() {
  const baseUrl = getBaseUrl();
  
  // If no API URL is configured or during build, use mock data immediately
  if (baseUrl === null) {
    return mockUsers;
  }
  
  try {
    const response = await fetch(`${baseUrl}/api/v1/profiles`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('Using mock data due to error:', error);
    return mockUsers;
  }
}

export async function fetchUsersByCompany(companyId: string) {
  const baseUrl = getBaseUrl();
  
  // If no API URL is configured or during build, use mock data immediately
  if (baseUrl === null) {
    return mockUsers.filter(user => user.company_id === companyId);
  }
  
  try {
    const response = await fetch(`${baseUrl}/api/v1/companies/${companyId}/users`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('Using mock data due to error:', error);
    return mockUsers.filter(user => user.company_id === companyId);
  }
}

export async function fetchJobs() {
  const baseUrl = getBaseUrl();
  
  // If no API URL is configured or during build, use mock data immediately
  if (baseUrl === null) {
    return mockJobs;
  }
  
  try {
    const response = await fetch(`${baseUrl}/api/v1/jobs`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('Using mock data due to error:', error);
    return mockJobs;
  }
}

export async function fetchJobsByCompany(companyId: string) {
  const baseUrl = getBaseUrl();
  
  // If no API URL is configured or during build, use mock data immediately
  if (baseUrl === null) {
    return mockJobs.filter(job => job.company_id === companyId);
  }
  
  try {
    const response = await fetch(`${baseUrl}/api/v1/companies/${companyId}/jobs`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('Using mock data due to error:', error);
    return mockJobs.filter(job => job.company_id === companyId);
  }
}