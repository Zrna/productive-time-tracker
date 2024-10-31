export function formatTimeDuration(value: number): string {
  if (value < 60) {
    return `${value} min`;
  } else {
    const hours = Math.floor(value / 60);
    const mins = value % 60;

    if (mins === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${mins}min`;
  }
}
