import { formatTimeDuration } from './time';

describe('Time', () => {
  describe('formatTimeDuration', () => {
    it('returns less than 60 minutes format correctly', () => {
      expect(formatTimeDuration(15)).toBe('15 min');
      expect(formatTimeDuration(59)).toBe('59 min');
    });

    it('returns exactly 60 minutes format correctly', () => {
      expect(formatTimeDuration(60)).toBe('1h');
    });

    it('returns more than 60 minutes but less than 120 minutes format correctly', () => {
      expect(formatTimeDuration(75)).toBe('1h 15min');
      expect(formatTimeDuration(90)).toBe('1h 30min');
    });

    it('returns exactly 120 minutes format correctly', () => {
      expect(formatTimeDuration(120)).toBe('2h');
    });

    it('returns more than 120 minutes format correctly', () => {
      expect(formatTimeDuration(135)).toBe('2h 15min');
      expect(formatTimeDuration(150)).toBe('2h 30min');
    });
  });
});
