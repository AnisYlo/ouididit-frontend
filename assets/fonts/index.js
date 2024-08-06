import * as Font from 'expo-font';

export const useFonts = async () => {
  await Font.loadAsync({
    'ClashGrotesk-regular': require('../fonts/ClashGrotesk-Regular.otf'),
  });
};
