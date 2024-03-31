import List from '@mui/material/List';
import { ChatListItem } from './chat-list-item/ChatListItem';
import { Divider, Stack } from '@mui/material';
import { ChatListHeader } from './chat-list-header/ChatListHeader';
import { useEffect, useState } from 'react';
import { ChatListAdd } from './chat-list-add/ChatListAdd';
import { useGetChats } from '../../hooks/useGetChats';
import { usePath } from '../../hooks/usePath';

export function ChatList() {
  const { data } = useGetChats();
  const [showAddChat, setShowAddChat] = useState<boolean>(false);
  const { path } = usePath();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

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
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            maxHeight: '80vh',
            overflow: 'auto',
          }}
        >
          {data?.chats.map((chat) => (
            <ChatListItem
              key={chat._id}
              chat={chat}
              selected={selectedChat === chat._id}
            />
          ))}
        </List>
      </Stack>
    </>
  );
}
