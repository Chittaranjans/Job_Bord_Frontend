import { NextResponse } from 'next/server';
import { mockJobs, mockCompanies } from "@/data/mock/companies";
export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  return mockCompanies.map(company => ({
    id: company.id
  }));
}

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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const baseUrl = getBaseUrl();
  
  // Return mock data during build or if no API URL
  if (baseUrl === null) {
    const jobs = mockJobs.filter(job => job.company_id === id);
    return NextResponse.json(jobs);
  }
  
  // The rest of your function for runtime requests...
  try {
    const response = await fetch(`${baseUrl}/api/v1/companies/${id}/jobs`, {
      next: { revalidate: 60 }
    });
    
    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    }
    
    const allJobsResponse = await fetch(`${baseUrl}/api/v1/jobs`, {
      next: { revalidate: 60 }
    });
    
    if (allJobsResponse.ok) {
      const jobs = await allJobsResponse.json();
      const filteredJobs = jobs.filter((job: { company_id: string }) => job.company_id === id);
      return NextResponse.json(filteredJobs);
    }
    
    throw new Error('Failed to fetch jobs');
  } catch (error) {
    console.error(`Error fetching jobs for company ${id}, using mock data:`, error);
    const jobs = mockJobs.filter(job => job.company_id === id);
    return NextResponse.json(jobs);
  }
}