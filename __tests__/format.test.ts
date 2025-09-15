import { describe, it, expect } from 'vitest';
import { formatEnergy, formatPower, formatPowerFactor } from '../lib/utils/format';

describe('Format utilities', () => {
  describe('formatEnergy', () => {
    it('should format small values in Wh', () => {
      expect(formatEnergy(0.5)).toBe('500 Wh');
      expect(formatEnergy(0.123)).toBe('123 Wh');
    });

    it('should format medium values in kWh', () => {
      expect(formatEnergy(1.5)).toBe('1.5 kWh');
      expect(formatEnergy(128.4)).toBe('128.4 kWh');
    });

    it('should format large values in MWh', () => {
      expect(formatEnergy(1500)).toBe('1.50 MWh');
      expect(formatEnergy(2345.6)).toBe('2.35 MWh');
    });
  });

  describe('formatPower', () => {
    it('should format small values in W', () => {
      expect(formatPower(500)).toBe('500 W');
      expect(formatPower(123)).toBe('123 W');
    });

    it('should format large values in kW', () => {
      expect(formatPower(1500)).toBe('1.50 kW');
      expect(formatPower(3250)).toBe('3.25 kW');
    });
  });

  describe('formatPowerFactor', () => {
    it('should format power factor as percentage', () => {
      expect(formatPowerFactor(0.94)).toBe('94.0%');
      expect(formatPowerFactor(0.8567)).toBe('85.7%');
    });
  });
});