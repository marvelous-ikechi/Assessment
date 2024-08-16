import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItem: {
    borderWidth: 1,
    padding: 4,
    height: 40,
    marginHorizontal: 5,
    marginVertical: 5,
    justifyContent: 'center',
    borderRadius: 5,
  },
});
