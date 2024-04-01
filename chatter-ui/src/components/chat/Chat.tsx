import { useLocation, useParams } from 'react-router-dom';
import { useGetChat } from '../../hooks/useGetChat';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useCreateMessage } from '../../hooks/useCreateMessage';
import { useEffect, useRef, useState } from 'react';
import { useGetMessages } from '../../hooks/useGetMessages';
import { PAGE_SIZE } from '../../constants/page-size';
import { useCountMessages } from '../../hooks/useCountMessages';
import InfiniteScroll from 'react-infinite-scroller';

export function Chat() {
  const params = useParams();
  const chatId = params._id!;
  const { data, fetchMore } = useGetChat({ _id: chatId });
  const [createMessage] = useCreateMessage();
  const [message, setMessage] = useState('');
  const { data: messages } = useGetMessages({
    chatId,
    limit: PAGE_SIZE,
    skip: 0,
  });
  const divRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { count: messagesCount, countMessages } = useCountMessages(chatId);

  useEffect(() => {
    countMessages();
  }, [countMessages]);

  useEffect(() => {
    if (messages?.messages && messages.messages.length <= PAGE_SIZE) {
      setMessage('');
      divRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location, messages]);

  async function handleCreateMessage() {
    await createMessage({
      variables: {
        createMessageInput: {
          chatId,
          content: message,
        },
      },
    });

    setMessage('');
  }

  return (
    <>
      <Stack
        sx={{
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <h1>{data?.chat.name}</h1>
        <Box sx={{ maxHeight: '70vh' }} overflow={'auto'}>
          <InfiniteScroll
            pageStart={0}
            loadMore={async () =>
              fetchMore({
                variables: {
                  chatId,
                  limit: PAGE_SIZE,
                  skip: messages?.messages.length,
                },
              })
            }
            isReverse
            hasMore={
              messagesCount && messages?.messages
                ? messages?.messages.length < messagesCount
                : false
            }
            useWindow={false}
            loader={
              <div key={0}>
                <Typography>Loading...</Typography>
              </div>
            }
          >
            {messages &&
              [...messages.messages]
                .sort(
                  (messageA, messageB) =>
                    new Date(messageA.createdAt).getTime() -
                    new Date(messageB.createdAt).getTime()
                )
                ?.map((message) => (
                  <Grid
                    container
                    alignItems={'center'}
                    marginBottom={'1rem'}
                    key={message._id}
                  >
                    <Grid item xs={3} lg={1}>
                      <Avatar
                        src={message.user.imageUrl}
                        sx={{ width: 52, height: 52 }}
                      />
                    </Grid>

                    <Grid item xs={10} md={11}>
                      <Stack>
                        <Paper sx={{ width: 'fit-content' }}>
                          <Typography sx={{ padding: '0.9rem' }}>
                            {message.content}
                          </Typography>
                        </Paper>
                        <Typography variant={'caption'} sx={{ marginLeft: '0.25rem' }}>
                          {new Date(message.createdAt).toLocaleTimeString()}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                ))}
          </InfiniteScroll>
          <div ref={divRef} />
        </Box>
        <Paper
          sx={{
            p: '2px 4px',
            display: 'flex',
            justifySelf: 'flex-end',
            alignItems: 'center',
            width: '100%',
            margin: '1rem 0',
          }}
        >
          <InputBase
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ ml: 1, flex: 1, width: '100%' }}
            placeholder='Message'
            onKeyDown={async (e) => {
              if (e.key === 'Enter') {
                await handleCreateMessage();
              }
            }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
          <IconButton
            onClick={async () => {
              await handleCreateMessage();
            }}
            color='primary'
            sx={{ p: '10px' }}
            aria-label='directions'
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </Stack>
    </>
  );
}
