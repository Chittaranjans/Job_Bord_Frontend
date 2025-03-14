// src/lib/api.ts
import { mockCompanies, mockUsers, mockJobs } from "@/data/mock/companies";

// Helper function to get the base URL for API calls
function getBaseUrl() {
  // When running on the server, we need to use an absolute URL
  if (typeof window === 'undefined') {
    // When deployed, use the production URL, otherwise use localhost
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  }
  // In the browser, relative URLs work fine
  return '';
}

export async function fetchCompanies() {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/v1/companies`);
    if (!response.ok) throw new Error('Failed to fetch');
    console.log('response', response);
    return await response.json();
    
  } catch (error) {
    console.error('Using mock data due to error:', error);
    return mockCompanies;
  }
}

export async function fetchCompanyById(id: string) {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/v1/companies/${id}`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('Using mock data due to error:', error);
    return mockCompanies.find(company => company.id === id) || mockCompanies[0];
  }
}

export async function fetchUsers() {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/v1/profiles`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('Using mock data due to error:', error);
    return mockUsers;
  }
}

export async function fetchUsersByCompany(companyId: string) {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/companies/${companyId}/users`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('Using mock data due to error:', error);
    return mockUsers.filter(user => user.company_id === companyId);
  }
}

export async function fetchJobs() {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/v1/jobs`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('Using mock data due to error:', error);
    return mockJobs;
  }
}

export async function fetchJobsByCompany(companyId: string) {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/v1/companies/${companyId}/jobs`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('Using mock data due to error:', error);
    return mockJobs.filter(job => job.company_id === companyId);
  }
}