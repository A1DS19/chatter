import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react/jsx-runtime';
import { Divider, ListItemButton } from '@mui/material';
import { router } from '../../Routes';
import { Chat } from '../../../gql/graphql';

interface IChatListItemProps {
  chat: Chat;
  selected: boolean;
}

export function ChatListItem({
  chat: { _id, name, latestMessage },
  selected,
}: IChatListItemProps) {
  return (
    <>
      <ListItem alignItems='flex-start' disablePadding>
        <ListItemButton
          onClick={() => router.navigate(`/chat/${_id}`)}
          selected={selected}
        >
          <ListItemAvatar>
            <Avatar alt='Remy Sharp' src={latestMessage?.user.imageUrl} />
          </ListItemAvatar>
          <ListItemText
            primary={name}
            secondary={
              <Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component='span'
                  variant='body2'
                  color='text.primary'
                >
                  {latestMessage?.user.username || ''}
                </Typography>
                {' ' + (latestMessage?.content || '')}
              </Fragment>
            }
          />
        </ListItemButton>
      </ListItem>

      <Divider variant='inset' />
    </>
  );
}
