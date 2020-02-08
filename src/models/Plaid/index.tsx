import merge from 'ramda/src/merge';
import Either from './../../util/Either';

declare const window: any;
const Plaid = window.Plaid;

interface PlaidModelInterface {
  onLoad: Function;
  onSuccess: Function;
  onExit: Function;
  onEvent: Function;
}

export default class PlaidModel {
  handler: any;
  plaidOptions: PlaidModelInterface;
  constructor(options: PlaidModelInterface) {
    this.plaidOptions = options;
  }

  load (): Either<string, Error> {
    try {
      this.handler = Plaid.create({
        clientName: 'Plaid Quickstart',
        countryCodes: ['US'],
        product: ['transactions'],
        env: 'sandbox',
        key: '8f8e5a63107fc2027a5768a1571988',
        onLoad: this.plaidOptions.onLoad,
        onSuccess: this.plaidOptions.onSuccess,
        onExit: this.plaidOptions.onExit,
        onEvent: this.plaidOptions.onEvent
      });
      this.handler.open();
      return Either.right<string, Error>("Ok");
    } catch (e) {
      return Either.left<string, Error>(Error("Failed to load Plaid create."));
    }
  }

  /**
   * Get handler getTransactions.
   */
  getTransactions(): void {

  }
}
