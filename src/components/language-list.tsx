import { FlatList, Text, TouchableOpacity, View } from "react-native";

const languages = [
  {
    code: 'en',
    name: 'English',
  },
  {
    code: 'es',
    name: 'Spanish',
  },
  {
    code: 'fr',
    name: 'French',
  },
  {
    code: 'de',
    name: 'German',
  },
  {
    code: 'it',
    name: 'Italian',
  },
  {
    code: 'pt',
    name: 'Portuguese',
  },
  {
    code: 'lt',
    name: 'Lithuanian',
  }
]


export default function LanguageList({onSelect}: { onSelect?: (language: string) => void }) {
  return (
    <FlatList
      data={languages}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            if (onSelect) {
              onSelect(item.code);
              console.log(item.code);
              }
            }
          }
          className="py-4 px-5 border-b border-gray-200 bg-white active:bg-gray-100"
        >
          <Text
            className="text-base text-gray-800 font-medium"
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  )
}
