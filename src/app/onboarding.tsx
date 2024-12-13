import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Globe,
  MessageCircle,
  UserPlus,
  BookOpen
} from 'lucide-react-native';
import Svg, { Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const router = useRouter();

  const onboardingData = [
    {
      title: "Welcome to LinguaConnect",
      description: "Learn languages by connecting with native speakers around the world!",
      Icon: Globe,
      buttonText: "Next"
    },
    {
      title: "Choose Your Language",
      description: "Select the languages you want to learn and teach. It's that simple!",
      Icon: BookOpen,
      buttonText: "Continue"
    },
    {
      title: "Meet Language Partners",
      description: "Connect with people who speak the language you want to learn.",
      Icon: UserPlus,
      buttonText: "Explore"
    },
    {
      title: "Start Your Journey",
      description: "Practice speaking, writing, and immerse yourself in new cultures!",
      Icon: MessageCircle,
      buttonText: "Get Started"
    }
  ];

  const handleNext = () => {
    if (currentScreen < onboardingData.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      // Navigate to main application
      router.replace('/');
    }
  };

  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {onboardingData.map((_, index) => (
          <Svg key={index} height="10" width="10" style={styles.paginationDot}>
            <Circle
              cx="5"
              cy="5"
              r="4"
              fill={currentScreen === index ? '#007AFF' : '#C7C7CC'}
            />
          </Svg>
        ))}
      </View>
    );
  };

  const currentData = onboardingData[currentScreen];
  const IconComponent = currentData.Icon;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <IconComponent
          size={200}
          color="#007AFF"
          strokeWidth={1.5}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          {currentData.title}
        </Text>
        <Text style={styles.descriptionText}>
          {currentData.description}
        </Text>
      </View>

      {renderPagination()}

      <TouchableOpacity
        style={styles.button}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>
          {currentData.buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40
  },
  iconContainer: {
    width: width * 0.8,
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },
  paginationDot: {
    marginHorizontal: 5
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 25
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default OnboardingScreen;
