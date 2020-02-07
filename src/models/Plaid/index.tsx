declare const window: any;
const Plaid = window.Plaid;


debugger
export default class {
  handler: any;
  constructor(onLoad: Function, onSuccess: Function, onExit: Function, onEvent: Function) {
    try {
      this.handler = Plaid.create({
        clientName: 'Plaid Quickstart',
        countryCodes: ['US'],
        product: ['transactions'],
        env: 'sandbox',
        key: '8f8e5a63107fc2027a5768a1571988',
        onLoad: onLoad,
        onSuccess: onSuccess,
        onExit: onExit,
        onEvent: onEvent
      });
    } catch (e) {
      // TBD
    }
  }
}
