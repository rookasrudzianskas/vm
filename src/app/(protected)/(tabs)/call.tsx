import { CallContent, StreamCall, useStreamVideoClient } from "@stream-io/video-react-native-sdk";
import React, { useEffect, useState } from 'react';

import MyVideoUI from '~/src/components/stream/my-video-ui';

const Call = () => {
  const videoClient = useStreamVideoClient();
  const [call, setCall] = useState<any>();

  useEffect(() => {
    const setupCall = async () => {
      if (!videoClient) return;
      const call = videoClient?.call('default', 'default_e5e10b91-8a3d-4e3e-9c19-0b58375162ba');
      try {
        await call?.join({ create: true });
        setCall(call);
      } catch (error) {
        console.error('Failed to join call:', error);
      }
    };
    setupCall();
  }, [videoClient]);

  if(!call) return null;

  return (
    <StreamCall call={call}>
      {/*<MyVideoUI />*/}
      <CallContent />
    </StreamCall>
  );
};

export default Call;
