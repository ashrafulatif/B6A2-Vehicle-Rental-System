const calculateDays = (
  rent_start_date: string,
  rent_end_date: string
): number => {
  const startDate = new Date(rent_start_date as string);
  const endDate = new Date(rent_end_date as string);

  const diffInMs = endDate.getTime() - startDate.getTime();
  const duration = diffInMs / (1000 * 60 * 60 * 24);

  return duration;
};

export const bookingHelper = {
  calculateDays,
};
