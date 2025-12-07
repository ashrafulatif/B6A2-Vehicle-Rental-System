//admin
const formatAdminResult = (result: any) => {
  const formatedResult = result.rows.map((booking: any) => {
    const {
      id,
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status,
      name,
      email,
      vehicle_name,
      registration_number,
    } = booking;

    return {
      id,
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status,
      customer: {
        name,
        email,
      },
      vehicle: {
        vehicle_name,
        registration_number,
      },
    };
  });

  return formatedResult;
};

//customer
const formatCustomerResult = (result: any) => {
  const formatedResult = result.rows.map((booking: any) => {
    const {
      id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status,
      vehicle_name,
      registration_number,
      type,
    } = booking;

    return {
      id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status,
      vehicle: {
        vehicle_name,
        registration_number,
        type,
      },
    };
  });

  return formatedResult;
};

export const formatResponse = {
  formatAdminResult,
  formatCustomerResult,
};
