import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const VERCEL_ANALYTICS_API_URL = 'https://api.vercel.com/v1';
    const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
    const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
    const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;

    if (!VERCEL_TOKEN || !VERCEL_TEAM_ID || !VERCEL_PROJECT_ID) {
      console.error('Missing environment variables:', {
        hasToken: !!VERCEL_TOKEN,
        hasTeamId: !!VERCEL_TEAM_ID,
        hasProjectId: !!VERCEL_PROJECT_ID
      });
      throw new Error('Missing Vercel environment variables');
    }

    const today = new Date();
    const startDate = new Date(today);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(today);
    endDate.setHours(23, 59, 59, 999);

    // First, get the deployment ID
    const deploymentsResponse = await fetch(
      `${VERCEL_ANALYTICS_API_URL}/deployments?teamId=${VERCEL_TEAM_ID}&projectId=${VERCEL_PROJECT_ID}&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
        },
      }
    );

    if (!deploymentsResponse.ok) {
      const errorData = await deploymentsResponse.json();
      console.error('Deployments API error:', errorData);
      throw new Error('Failed to fetch deployments from Vercel');
    }

    const deploymentsData = await deploymentsResponse.json();
    const latestDeployment = deploymentsData.deployments[0];

    if (!latestDeployment) {
      throw new Error('No deployments found');
    }

    // Now get analytics for the latest deployment
    const analyticsResponse = await fetch(
      `${VERCEL_ANALYTICS_API_URL}/analytics?teamId=${VERCEL_TEAM_ID}&projectId=${VERCEL_PROJECT_ID}&deploymentId=${latestDeployment.id}&from=${startDate.toISOString()}&to=${endDate.toISOString()}`,
      {
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
        },
      }
    );

    if (!analyticsResponse.ok) {
      const errorData = await analyticsResponse.json();
      console.error('Analytics API error:', errorData);
      throw new Error('Failed to fetch analytics from Vercel');
    }

    const data = await analyticsResponse.json();

    // Calculate metrics
    const visitors = data.visitors || 0;
    const pageViews = data.pageviews || 0;
    const bounceRate = data.bounceRate || 0;

    console.log('Analytics data:', {
      visitors,
      pageViews,
      bounceRate,
      deploymentId: latestDeployment.id
    });

    return NextResponse.json({
      visitors,
      pageViews,
      bounceRate: bounceRate * 100, // Convert to percentage
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch analytics data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 