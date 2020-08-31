export const compoundWithdraw = async (amount: number) => {
  //TODO Send compound withdraw transaction
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Withdrew ", amount);
  return true;
};

export const compoundSupply = async (amount: number) => {
  //TODO Send compound supply transaction
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Supplied ", amount);
  return true;
};

export default { compoundWithdraw, compoundSupply };
