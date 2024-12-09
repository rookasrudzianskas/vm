import { StreamCall, useStreamVideoClient } from '@stream-io/video-react-native-sdk';
import React, { useEffect, useState } from 'react';

import MyVideoUI from '~/components/my-video-ui';

const Call = () => {
  const videoClient = useStreamVideoClient();
  const [call, setCall] = useState<any>();

  useEffect(() => {
    const setupCall = async () => {
      if (!videoClient) return;
      const call = videoClient?.call('default', 'my-call-id');
      await call?.join({ create: true });
      setCall(call);
    };
    setupCall();
  }, [videoClient]);

  return (
    <StreamCall call={call}>
      <MyVideoUI />
    </StreamCall>
  );
};

export default Call;
