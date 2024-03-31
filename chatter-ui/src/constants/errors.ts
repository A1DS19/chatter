import { SnackMessage } from '../types/snack-message.';

export const UNKNOW_ERROR = 'An unknown error occurred';

export const UNKNOW_ERROR_SNACK_MESSAGE: SnackMessage = {
  message: UNKNOW_ERROR,
  severity: 'error',
};
