import { makeVar } from '@apollo/client';
import { SnackMessage } from '../types/snack-message.';

export const snackVar = makeVar<SnackMessage | undefined>(undefined);
