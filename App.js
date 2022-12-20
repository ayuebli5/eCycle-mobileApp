import "react-native-gesture-handler";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import UpdatesScreen from "./screens/UpdatesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ActionScreen from "./screens/ActionScreen";
import Footer from "./components/Footer";
import UserProfileScreen from "./screens/UserProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import DeliveryAddressScreen from "./screens/DeliveryAddressScreen";
import WalletScreen from "./screens/WalletScreen";
import ConfigureSettingsScreen from "./screens/ConfigureSettingsScreen";
import FillDeviceInfoScreen from "./screens/FillDeviceInfoScreen";
import CartScreen from "./screens/CartScreen";
import EstimateScreen from "./screens/EstimateScreen";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import ContinueToCartScreen from "./screens/ContinueToCartScreen";
import TrackScreen from "./screens/TrackScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";
import LoginScreen from "./screens/LoginScreen";
import RewardsScreen from "./screens/RewardsScreen";
import SignUpScreen from "./screens/SignUpScreen";
import AddAddressScreen from "./screens/AddAddressScreen";
import ChangeAddressScreen from "./screens/ChangeAddressScreen";
import { Provider } from "react-redux";
import { store } from "./store";
import RepairFillScreen from "./screens/RepairFillScreen";
import RepairContinueScreen from "./screens/RepairContinueScreen";

const Tab = createBottomTabNavigator();

// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <TailwindProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Updates" component={UpdatesScreen} />
            <Stack.Screen name="Action" component={ActionScreen} />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen
              name="DeliveryAddress"
              component={DeliveryAddressScreen}
            />
            <Stack.Screen name="Wallet" component={WalletScreen} />
            <Stack.Screen
              name="ConfigureSettings"
              component={ConfigureSettingsScreen}
            />
            <Stack.Screen
              name="FillDeviceInfo"
              component={FillDeviceInfoScreen}
            />
            <Stack.Screen name="RepairFill" component={RepairFillScreen} />
            <Stack.Screen
              name="RepairContinue"
              component={RepairContinueScreen}
              options={{
                presentation: "transparentModal",
                headerShown: false,
                gestureEnabled: true,
                gestureResponseDistance: 1000,
                cardOverlayEnabled: true,
                ...TransitionPresets.ModalPresentationIOS,
              }}
            />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen
              name="Estimate"
              component={EstimateScreen}
              options={{
                presentation: "transparentModal",
                headerShown: false,
                gestureEnabled: true,
                gestureResponseDistance: 1000,
                cardOverlayEnabled: true,
                ...TransitionPresets.ModalPresentationIOS,
              }}
            />
            <Stack.Screen
              name="ContinueToCart"
              component={ContinueToCartScreen}
              options={{
                presentation: "transparentModal",
                headerShown: false,
                gestureEnabled: true,
                gestureResponseDistance: 1000,
                cardOverlayEnabled: true,
                ...TransitionPresets.ModalPresentationIOS,
              }}
            />
            <Stack.Screen name="Track" component={TrackScreen} />
            <Stack.Screen
              name="Checkout"
              component={CheckoutScreen}
              options={{
                headerShown: false,
                gestureEnabled: true,
                cardOverlayEnabled: true,
                ...TransitionPresets.ModalPresentationIOS,
              }}
            />
            <Stack.Screen
              name="PreparingOrder"
              component={PreparingOrderScreen}
              options={{ presentation: "fullScreenModal", headerShown: false }}
            />
            <Stack.Screen name="Rewards" component={RewardsScreen} />
            <Stack.Screen name="AddAddress" component={AddAddressScreen} />
            <Stack.Screen
              name="ChangeAddress"
              component={ChangeAddressScreen}
              options={{
                presentation: "transparentModal",
                headerShown: false,
                gestureEnabled: true,
                gestureResponseDistance: 1000,
                cardOverlayEnabled: true,
                ...TransitionPresets.ModalPresentationIOS,
              }}
            />
          </Stack.Navigator>
          {/* <Footer /> */}
        </TailwindProvider>
      </Provider>
    </NavigationContainer>
  );
}
