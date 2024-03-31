import { SnackSeverity } from './snack-severity';

export type SnackMessage = {
  message: string;
  severity?: SnackSeverity;
};
