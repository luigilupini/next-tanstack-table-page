'use server';

import db from '@/server/prisma';
import { Project, Report, WhiteHat } from '@prisma/client';

export interface ReportWithRelations extends Report {
  project: Project;
  hacker: WhiteHat;
}

export const getReports = async (
  apiKey: string
): Promise<ReportWithRelations[]> => {
  const expectedApiKey = process.env.API_KEY;

  if (apiKey !== expectedApiKey) {
    throw new Error('Unauthorized: Invalid API key');
  }

  try {
    const reports = await db.report.findMany({
      include: { hacker: true, project: true },
    });

    if (!reports || reports.length === 0) {
      throw new Error('No reports found');
    }

    return reports;
  } catch (error) {
    console.error('Failed to fetch reports:', error);
    throw new Error('Failed to fetch reports');
  }
};
