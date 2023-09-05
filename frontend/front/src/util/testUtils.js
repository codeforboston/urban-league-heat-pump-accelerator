/**
 * Testing utilities - not for use in normal code
 */

export const mockNullMutation = () => [
  jest.fn(),
  { data: {}, error: {}, isLoading: false, isSuccess: false },
];
