import Notify from 'bnc-notify';

const networkId = process.env.NODE_ENV === "development" ? 3 : 1;

export default Notify({
  dappId: process.env.NOTIFY_ID,
  networkId,
  desktopPosition: "topRight"
});
