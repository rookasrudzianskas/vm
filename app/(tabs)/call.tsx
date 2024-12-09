import { CallContent, StreamCall, useStreamVideoClient } from "@stream-io/video-react-native-sdk";
import React, { useEffect, useState } from 'react';

import MyVideoUI from '~/components/my-video-ui';

const Call = () => {
  const videoClient = useStreamVideoClient();
  const [call, setCall] = useState<any>();

  useEffect(() => {
    const setupCall = async () => {
      if (!videoClient) return;
      const call = videoClient?.call('default', 'default_b0585e19-9d05-407f-b597-f8bcd74644d6');
      await call?.join({ create: true });
      setCall(call);
    };
    setupCall();
  }, [videoClient]);

  return (
    <StreamCall call={call}>
      {/*<MyVideoUI />*/}
      <CallContent />
    </StreamCall>
  );
};

export default Call;
