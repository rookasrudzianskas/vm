import {
  useCallStateHooks,
  CallParticipantsList,
  ParticipantView,
} from '@stream-io/video-react-native-sdk';

const MyVideoUI = () => {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();
  console.log('useParticipants', participants);

  return (
    <CallParticipantsList  participants={participants} />
  );
};

export default MyVideoUI;
