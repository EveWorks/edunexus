export function getRemainingDays(timestamp: any) {
  const targetDate: any = new Date(timestamp * 1000);
  const currentDate: any = new Date();

  const timeDifference = targetDate - currentDate;

  const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return remainingDays > 0 ? remainingDays : null;
}
