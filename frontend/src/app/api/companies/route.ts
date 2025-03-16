import { NextResponse } from 'next/server';
import { mockCompanies } from "@/data/mock/companies";
export const dynamic = "force-static";
export const revalidate = false;

function getBaseUrl() {
  if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
    return null; // Always use mock data during build
  }
  // Get the API URL from environment variables
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // If there's no URL configured, return null to signal use of mock data
  if (!apiUrl || apiUrl.trim() === '') {
    return null;
  }
  
  return apiUrl;
}

export async function GET() {
  const baseUrl = getBaseUrl();
  
  // For static export or if no API URL is configured, use mock data immediately
  if (baseUrl === null) {
    return NextResponse.json(mockCompanies);
  }
  
  try {
    const response = await fetch(`${baseUrl}/api/v1/companies`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching companies, using mock data:', error);
    return NextResponse.json(mockCompanies);
  }
}