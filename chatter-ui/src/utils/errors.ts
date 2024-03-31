export function extractErrorMessage(error: any) {
  let errorMessage = error.graphQLErrors[0]?.extensions?.originalError?.message;

  if (Array.isArray(errorMessage)) {
    return errorMessage[0];
  }

  return errorMessage;
}
