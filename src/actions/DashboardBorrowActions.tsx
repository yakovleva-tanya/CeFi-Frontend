

export const repayLoan = async (id: string) => {
  //TODO Repay loan transaction
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("repaid ", id);
  return true;
};

export default { repayLoan };
