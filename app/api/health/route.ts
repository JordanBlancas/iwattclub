import { NextResponse } from 'next/server';
import { FEATURES } from '@/lib/featureFlags';

export async function GET() {
  const healthCheck = {
    ok: true,
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '0.1.0',
    demo: FEATURES.DEMO_MODE,
    features: {
      demoMode: FEATURES.DEMO_MODE,
      realTimeUpdates: FEATURES.REAL_TIME_UPDATES,
      communityFeatures: FEATURES.COMMUNITY_FEATURES,
      challenges: FEATURES.CHALLENGES,
      education: FEATURES.EDUCATION,
    },
    environment: {
      nodeEnv: process.env.NODE_ENV || 'development',
      hasAppSyncConfig: !!(process.env.NEXT_PUBLIC_APPSYNC_HTTP),
      hasCognitoConfig: !!(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID),
    },
    uptime: process.uptime(),
  };

  return NextResponse.json(healthCheck, {
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}

// También responder a POST para health checks más complejos
export async function POST() {
  return GET();
}