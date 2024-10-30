import { formatDate, getTomorrowDate, getYesterdayDate } from './date';

const date = '2024-10-30T00:00:00Z';

describe('Date', () => {
  describe('formatDate', () => {
    it('should return the date in YYYY-MM-DD format', () => {
      expect(formatDate(new Date(date))).toBe('2024-10-30');
    });

    it('should handle single digit months and days correctly', () => {
      const singleDigitDate = '2024-01-05T00:00:00Z';
      expect(formatDate(new Date(singleDigitDate))).toBe('2024-01-05');
    });
  });

  describe('getYesterdayDate', () => {
    it('should return the date of yesterday in YYYY-MM-DD format', () => {
      expect(getYesterdayDate(new Date(date))).toBe('2024-10-29');
    });

    it('should handle month transition correctly', () => {
      const mockDate = new Date('2024-11-01T00:00:00Z');
      expect(getYesterdayDate(mockDate)).toBe('2024-10-31');
    });
  });

  describe('getTomorrowDate', () => {
    it('should return the date of tomorrow in YYYY-MM-DD format', () => {
      expect(getTomorrowDate(new Date(date))).toBe('2024-10-31');
    });

    it('should handle month transition correctly', () => {
      const mockDate = new Date('2024-10-31T00:00:00Z');
      expect(getTomorrowDate(mockDate)).toBe('2024-11-1');
    });
  });
});
