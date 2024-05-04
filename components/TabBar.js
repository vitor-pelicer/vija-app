import React, { useRef } from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const TabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const { navigate } = useNavigation();
  const linePosition = useRef(new Animated.Value(0)).current;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const totalTabs = state.routes.length;
  const tabWidth = 100; // Adjust as needed

  const translateX = linePosition.interpolate({
    inputRange: [0, totalTabs - 1],
    outputRange: [0, (totalTabs - 1) * tabWidth],
  });

  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#fff' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height:60}}
            key={route.name}
          >
            <Ionicons
              name={options.tabBarIcon}
              size={24}
              color={isFocused ? '#FF7A00' : '#ccc'}
            />
            <Text style={{ color: isFocused ? '#FF7A00' : '#ccc' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;