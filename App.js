import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TelaDetalhes from "./src/Telas/TelaDetalhes";
import TelaInicial from "./src/Telas/TelaInicial";
import TelaResultado from "./src/Telas/TelaResultado";

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaInicial">
        <Stack.Screen name="TelaInicial" component={TelaInicial} options={{ headerShown: false }} />
        <Stack.Screen name="TelaResultado" component={TelaResultado} options={{ headerShown: false }} />
        <Stack.Screen name="TelaDetalhes" component={TelaDetalhes} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
