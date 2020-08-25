export const claimInterest = async (currency:string) =>{
  //TODO Send Claim Interest transaction
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("claimed ", currency);
  return true;
}

export const collectInterest = async (currency: string) => {
  //TODO Send collect Interest transaction
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("collected ", currency);
  return true;
};

export default { claimInterest, collectInterest};
