import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStore = () => {
  const saveItem = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving item to AsyncStorage:', error);
    }
  };

  const getItem = async (key: string): Promise<string | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error retrieving item from AsyncStorage:', error);
      return null;
    }
  };

  return {
    getItem,
    saveItem,
  };
};

export default useAsyncStore;
