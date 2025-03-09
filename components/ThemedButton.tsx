import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ThemedButtonProps {
  onPress: () => void;
  title: string;
}

export function ThemedButton({ onPress, title }: ThemedButtonProps) {
  const backgroundColor = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'background');

  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor }]} 
      onPress={onPress}
    >
      <ThemedText style={[styles.text, { color: textColor }]}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});