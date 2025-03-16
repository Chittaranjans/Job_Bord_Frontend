import { NextResponse } from 'next/server';
import { mockUsers , mockCompanies} from "@/data/mock/companies";
export const dynamic = "force-static";
export const revalidate = false;
export async function generateStaticParams() {
  // Use your mock data to generate all possible company IDs
  return mockCompanies.map(company => ({
    id: company.id
  }));
}
// Helper function to get base URL
function getBaseUrl() {
  return process.env.NEXT_PUBLIC_API_URL ;
}

export async function GET() {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/v1/profiles`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching profiles, using mock data:', error);
    return NextResponse.json(mockUsers);
  }
}