import { NextResponse } from 'next/server';
import fitdata from '@/fitdata.json';
import type { Workout } from '@/types/fitTypes';

export async function GET() {
  return NextResponse.json(fitdata as Workout[]);
}