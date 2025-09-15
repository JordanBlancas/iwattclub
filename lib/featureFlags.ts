export const IS_DEMO = process.env.NEXT_PUBLIC_DEMO === 'true';

export const FEATURES = {
  DEMO_MODE: IS_DEMO,
  REAL_TIME_UPDATES: true,
  COMMUNITY_FEATURES: true,
  CHALLENGES: true,
  EDUCATION: true,
} as const;