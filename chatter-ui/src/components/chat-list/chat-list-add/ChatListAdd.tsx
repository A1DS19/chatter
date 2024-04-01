import {
  Box,
  Button,
  FormGroup,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useCreateChat } from '../../../hooks/useCreateChat';
import { UNKNOW_ERROR } from '../../../constants/errors';
import { router } from '../../Routes';

interface IChatListAddProps {
  open: boolean;
  handleClose: () => void;
}

export function ChatListAdd({ handleClose, open }: IChatListAddProps) {
  const [createChat] = useCreateChat();
  const [error, setError] = useState('');
  const [name, setName] = useState('');

  function onClose() {
    setName('');
    setError('');
    handleClose();
  }

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Stack spacing={2}>
            <Typography variant='h6' component={'h2'}>
              Add Chat
            </Typography>

            <FormGroup sx={{ display: 'flex', gap: 2 }}>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                label='Name'
                error={!!error}
                helperText={error}
              />
              <Button
                variant='outlined'
                onClick={async () => {
                  if (name?.length === 0) {
                    setError('Name is required');
                    return;
                  }

                  try {
                    const chat = await createChat({
                      variables: {
                        createChatInput: { name: name },
                      },
                    });
                    onClose();
                    router.navigate(`/chat/${chat.data?.createChat._id}`);
                  } catch (error) {
                    setError(UNKNOW_ERROR);
                  }
                }}
              >
                Save
              </Button>
            </FormGroup>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
