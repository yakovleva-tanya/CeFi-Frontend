var serverURL: string;
if (process.env.NODE_ENV === 'production') {
  serverURL = '';
} else {
  serverURL = 'http://localhost:3000';
}

const fortmaticOptions = {
  apiKey: process.env.FORTMATIC_API_KEY,
  network: process.env.FORTMATIC_NETWORK,
}

export default {
  serverURL,
  fortmaticOptions,
};
