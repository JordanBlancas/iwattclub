import { IS_DEMO } from '../featureFlags';
import * as mock from './mock';
import * as aws from './aws';

export type Measurement = { 
  ts: string; 
  powerW: number; 
  voltageV: number; 
  pf: number;
};

export type Summary = { 
  energy_kWh_24h: number; 
  peakW: number; 
  pf_avg: number;
};

export type Device = {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'error';
  lastSeen: string;
};

export type CommunityStats = {
  totalMembers: number;
  totalEnergy_kWh: number;
  co2Saved_kg: number;
  rankingPosition: number;
};

// Selectores de adaptador basados en feature flag
export const getSummary = IS_DEMO ? mock.getSummary : aws.getSummary;
export const getLastReadings = IS_DEMO ? mock.getLastReadings : aws.getLastReadings;
export const subscribeLive = IS_DEMO ? mock.subscribeLive : aws.subscribeLive;
export const getDevices = IS_DEMO ? mock.getDevices : aws.getDevices;
export const getDevice = IS_DEMO ? mock.getDevice : aws.getDevice;
export const getCommunityStats = IS_DEMO ? mock.getCommunityStats : aws.getCommunityStats;