import merge from 'ramda/src/merge';
import Either from './../../util/Either';
import axios from 'axios';

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
  static async getTransactions(public_token: string): Promise<Array<any>> {
    return axios.post('http://127.0.0.1:8080/plaid_exchange', {
      public_token
    })
    .then(function (response) {
      console.log(response);
      return response.data.transactions as Array<string>;
    });
  }
}
