/**
 * Call ArrowheadCRA with the given loan details.
 *
 * @namespace RegisterLoan
 * @category ReactActions
 */

import { sendLendingApplication, LendingApplication } from './../models/ArrowheadCRA';
import { AppContextState } from "./../context/app";

export default async function registerLoan(lendingApplication: LendingApplication, updateAppState: Function) {
  try {
    return;
  } catch (err) {
    console.log(err);
    return updateAppState((st: AppContextState) => {
      const errorModal = {
        show: true,
        message: "An error occurred sending lending application. Please try again.",
        title: "Error"
      };
      return { ...st, errorModal };
    });
  }
}
