import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { AppearanceProvider } from 'react-native-appearance';
import { withAuthenticator } from 'aws-amplify-react-native'

import Amplify, { Auth, API } from 'aws-amplify'
import config from './src/aws-exports'
Amplify.configure(config)


function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  //run only when App is first launched
  useEffect(() => {
    const fetchUser = async () => {

      //fetch authenticated user from Auth
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});
      //console.log(userInfo);

      if(userInfo) {
        //fetch user from backend with userId from Auth


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
