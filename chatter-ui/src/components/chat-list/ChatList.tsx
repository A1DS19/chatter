import List from '@mui/material/List';
import { ChatListItem } from './chat-list-item/ChatListItem';
import { Box, Divider, Stack } from '@mui/material';
import { ChatListHeader } from './chat-list-header/ChatListHeader';
import { useEffect, useState } from 'react';
import { ChatListAdd } from './chat-list-add/ChatListAdd';
import { useGetChats } from '../../hooks/useGetChats';
import { usePath } from '../../hooks/usePath';
import { useMessageCreated } from '../../hooks/useMessageCreated';
import { PAGE_SIZE } from '../../constants/page-size';
import InfiniteScroll from 'react-infinite-scroller';
import { useCountChats } from '../../hooks/useCountChats';

export function ChatList() {
  const { data, fetchMore } = useGetChats({
    limit: PAGE_SIZE,
    skip: 0,
  });
  const [showAddChat, setShowAddChat] = useState<boolean>(false);
  const { path } = usePath();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const chatIds = data?.chats.map((chat) => chat._id) || [];
  const { count: chatsCount, countChats } = useCountChats();
  useMessageCreated({ chatIds });

  useEffect(() => {
    countChats();
  }, [countChats]);

  useEffect(() => {
    const chatId = path.split('chat/')[1];
    if (chatId) {
      setSelectedChat(chatId);
    }
  }, [path]);

  function handleAddChat() {
    setShowAddChat(true);
  }

  function handleAddChatClose() {
    setShowAddChat(false);
  }

  return (
    <>
      <ChatListAdd open={showAddChat} handleClose={handleAddChatClose} />
      <Stack>
        <ChatListHeader handleAddChat={handleAddChat} />
        <Divider />
        <Box
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            maxHeight: '80vh',
            overflow: 'auto',
          }}
        >
          <InfiniteScroll
            pageStart={0}
            loadMore={() => fetchMore({ variables: { skip: data?.chats.length } })}
            hasMore={data?.chats && chatsCount ? data.chats.length < chatsCount : false}
            useWindow={false}
            loader={<div key={0}>Loading ...</div>}
          >
            {data?.chats &&
              [...data.chats]
                .sort((chatA, chatB) => {
                  if (!chatA.latestMessage) {
                    return -1;
                  }

                  return (
                    new Date(chatB.latestMessage?.createdAt).getTime() -
                    new Date(chatA.latestMessage?.createdAt).getTime()
                  );
                })
                .map((chat) => (
                  <ChatListItem
                    key={chat._id}
                    chat={chat}
                    selected={selectedChat === chat._id}
                  />
                ))}
          </InfiniteScroll>
        </Box>
      </Stack>
    </>
  );
}
