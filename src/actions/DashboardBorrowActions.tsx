export const repayLoan = async (id: string) => {
  //TODO Repay loan transaction
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("repaid ", id);
  return true;
};

export const loanDeposit = async () => {
  //TODO send deposit transaction
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("deposited ");
  return true;
};

export const loanWithdraw = async () => {
  //TODO send deposit transaction
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("withdrawn ");
  return true;
};


export default { repayLoan, loanDeposit, loanWithdraw };
