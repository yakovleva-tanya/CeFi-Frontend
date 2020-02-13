var serverURL: string;
if (process.env.NODE_ENV === 'production') {
  serverURL = '';
} else {
  serverURL = 'http://localhost:3000';
}

export default {
  serverURL
};
