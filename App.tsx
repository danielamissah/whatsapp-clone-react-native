import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { AppearanceProvider } from 'react-native-appearance';
import { withAuthenticator } from 'aws-amplify-react-native';

import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { getUser } from './src/graphql/queries';
import { createUser } from './src/graphql/mutations';
import config from './src/aws-exports';
Amplify.configure(config);

const randomImages =[
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg'
]


function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  }
  

  //run only when App is first launched
  useEffect(() => {
    const fetchUser = async () => {

      //fetch authenticated user from Auth
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});
      //console.log(userInfo);

      if(userInfo) {
        //fetch user from backend with userId from Auth
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub }));

          if(userData.data.getUser) {
            console.log("User is already registered in database");
            return;
          }

          const newUser ={
            id: userInfo.attributes.sub,
            name: userInfo.username,
            imageUri: getRandomImage(),
            status: 'Hey, I am using WhatsApp'
          };

          await API.graphql(
            graphqlOperation(
              createUser,
              {input: newUser}
            )
          )


      //if user with id doesn't exist, create new one

      }


      

    }
    fetchUser();

  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppearanceProvider>
        <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>

      </AppearanceProvider>
      
    );
  }
}

export default withAuthenticator(App)
