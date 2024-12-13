// @ts-nocheck
import { useWatchers } from "../utils/useWatchers";
import { useEffect, useState } from "react";
import { startAI, stopAI } from "~/src/http/requests";
import { Pressable, Text } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "~/src/contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "~/src/lib/profile";

const ControlAIButton = ({ channel }: { channel: any }) => {
  const channelId = channel.id;
  const { watchers, loading } = useWatchers({ channel });
  const [isAIOn, setIsAIOn] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => fetchProfile(user?.id!),
  });

  useEffect(() => {
    if (watchers) {
      setIsAIOn(watchers.some((watcher) => watcher.startsWith('ai-bot')));
    }
  }, [watchers]);

  useEffect(() => {
    const userData = {
      user_name: profile?.name,
      target_language: "English",
      native_language: "German",
      proficiency_level: "Intermediate",
    }

    startAI(channelId, userData);
    return () => {
      stopAI(channelId);
    }
  }, []);

  return watchers && !loading ? (
    <Pressable
      style={{
        padding: 8,
        position: 'absolute',
        top: 18,
        right: 18,
        backgroundColor: '#D8BFD8',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
      }}
      onPress={onPress}
    >
      <Text style={{ fontSize: 16, fontWeight: '500' }}>
        {isAIOn ? 'Stop AI 🪄' : 'Start AI 🪄'}
      </Text>
    </Pressable>
  ) : null;
};

export default ControlAIButton;
