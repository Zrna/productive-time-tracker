export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getYesterdayDate(value: Date): string {
  const yesterday = value.setDate(value.getDate() - 1);
  return formatDate(new Date(yesterday));
}

export function getTomorrowDate(value: Date): string {
  const tomorrow = value.setDate(value.getDate() + 1);
  return formatDate(new Date(tomorrow));
}
