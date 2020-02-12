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

export interface PlaidTransaction {
  name: string;
  date: string;
  amount: Number;
}

function transformResponse(transaction: any): Either<PlaidTransaction, Error> {
  if (transaction.amount && transaction.date && transaction.name) {
    return Either.right({
      amount: transaction.amount,
      date: transaction.date,
      name: transaction.name
    });
  }
  return Either.left(Error("Could not parse transaction."));
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
  static async getTransactions(public_token: string): Promise<Array<Either<PlaidTransaction, Error>>> {
    return axios.post('/plaid_exchange', {
      public_token
    })
    .then(function (response) {
      console.log(response);
      return response.data.transactions.transactions.map(transformResponse);
    });
  }
}
