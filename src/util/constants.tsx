var serverURL: string;
if (process.env.NODE_ENV === 'production') {
  serverURL = '';
} else {
  serverURL = 'http://localhost:3000';
}

export const fortmaticOptions = {
  apiKey: process.env.FORTMATIC_API_KEY || "pk_test_DE7A33DFF78D95FD",
  network: process.env.FORTMATIC_NETWORK || "ropsten",
};

export default {
  serverURL,
  fortmaticOptions,
};
