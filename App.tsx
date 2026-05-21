import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import TravlPiinsAmfindsexpllrstack from './TravlPiinsAmfinds/TravlPiinsAmfindsnavg/TravlPiinsAmfindsexpllrstack.tsx';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TravlPiinsAmfindsexpllrstack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
