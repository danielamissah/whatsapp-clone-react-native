import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import ContactListItem from '../components/ContactListItem';
import users from '../data/Users';
import { FlatList } from 'react-native-gesture-handler';

export default function ContactsScreen() {
  return (
    <View style={styles.container}>
       <FlatList 
      style={{width: '100%'}}
        data={users} 
        renderItem={({ item }) => <ContactListItem user={item} /> }
        keyExtractor={( item ) => item.id}
        /> 
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
 
});
