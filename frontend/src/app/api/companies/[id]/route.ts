import { NextResponse } from 'next/server';
import { mockCompanies } from "@/data/mock/companies";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {

  const id = params.id;
  

  const company = mockCompanies.find(c => c.id === id);
  
  if (!company) {
    return NextResponse.json({ error: 'Company not found' }, { status: 404 });
  }
  
  return NextResponse.json(company);
}