import Notify from 'bnc-notify';

export default Notify({
  dappId: process.env.NOTIFY_ID,
  networkId: 3,
  desktopPosition: "topRight"
});
