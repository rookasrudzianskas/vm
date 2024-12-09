import '../global.css';

import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';

const client = StreamChat.getInstance('fbev6wznrvfv');

export default function Layout() {
  useEffect(() => {
    const setupClient = async () => {
      await client.connectUser(
        {
          id: 'jlahey',
          name: 'Jim Lahey',
          image: 'https://i.imgur.com/fR9Jz14.png',
        },
        client.devToken('jlahey')
      );

      const channel = client.channel('messaging', 'the_park', {
        name: 'The Park',
      });
      await channel.watch();
    };
    setupClient();

    return () => {
      client.disconnectUser();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OverlayProvider>
        <Chat client={client}>
          <Stack />
        </Chat>
      </OverlayProvider>
    </GestureHandlerRootView>
  );
}
