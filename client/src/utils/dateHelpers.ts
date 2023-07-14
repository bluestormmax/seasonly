export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString();
}

export function getMonthName(): string {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  return month;
}
