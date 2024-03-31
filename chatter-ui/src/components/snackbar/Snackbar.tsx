import { useReactiveVar } from '@apollo/client';
import { Snackbar as MUISnackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { snackVar } from '../../constants/snack';

interface ISnackbarProps {}

export function Snackbar({}: ISnackbarProps) {
  const snack = useReactiveVar(snackVar);
  const handleClose = () => snackVar(undefined);

  return (
    <>
      {snack && (
        <MUISnackbar open={!!snack} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={snack.severity}
            variant='filled'
            sx={{ width: '100%' }}
          >
            {snack.message}
          </Alert>
        </MUISnackbar>
      )}
    </>
  );
}
