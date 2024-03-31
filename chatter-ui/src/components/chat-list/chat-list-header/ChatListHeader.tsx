import { AppBar, IconButton, Toolbar } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

interface IChatListHeaderProps {
  handleAddChat: () => void;
}

export function ChatListHeader({ handleAddChat }: IChatListHeaderProps) {
  return (
    <>
      <AppBar position='static' color='transparent'>
        <Toolbar>
          <IconButton onClick={handleAddChat} size='large' edge='start'>
            <AddCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
