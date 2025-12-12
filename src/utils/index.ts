export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    return (error as { response?: { data?: unknown } }).response?.data;
  }

  return "Something went wrong";
};