type NextError = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default NextError;
