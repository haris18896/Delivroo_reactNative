# Delivroo_reactNative

First of all we will have to install Expo Client on our machine so that we can use it to create hybrid apps.

```ssh
npm install -g expo-cli
npm i gitmoji-cli
```

after that we are going to generate a template or our startup app using expo-cli. 

`npx create-expo-app <app name>`

to run our app we will use `expo start` command.

it will run our app and will show us some information about our app, by `pressing ?` it will show us all the options and devices to run our app on.


› Press a │ open Android // connect to android device
› shift+a │ select a device or emulator
› Press i │ open iOS simulator // Xcode needs to be installed
› shift+i │ select a simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
› shift+m │ more tools
› Press j │ open JavaScript inspector for Hermes
› Press o │ open project code in your editor
› Press c │ show project QR
› Press p │ toggle build mode (development)

---
---

# TailwindCss React Native
we are going to use tailwindCss for styling our app.

```
npm install tailwindcss-react-native
npm install --save-dev tailwindcss
```

make a file `tailwind.config.js`
and paste this code
```js
// tailwind.config.js
module.exports = {
  content: [
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  // ...
};
```

so by this config, the app will look for those files only to load the tailwind css.

After that we will need to add TailwindProvider into our app. we will add the Tailwind Provider through `Babel`

for that we have to make a file `babel.config.js` which is already exist so we just need to add and paste this code in the `babel.config.js` file

```js
// babel.config.js
// module.exports = {
  plugins: ["tailwindcss-react-native/babel"],
// };
```

also install `Tailwind CSS IntelliSense` on your VS-Code.

  * Wrap the `APP.js` file in the `Tailwind Provider`

```js

import { TailwindProvider } from "tailwindcss-react-native";

function MyAppsProviders({ children }) {
  return <TailwindProvider>{children}</TailwindProvider>;
}
```

for all that to work we need to install React Native Navigation and all the dependencies to Expo managed Project
```
npm install @react-navigation/native
expo install react-native-screens react-native-safe-area-context
```

and then finally wrap the app in the Navigation container

```js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
  );
}
```

after that we have to introduce our app to native-stack

```
npm install @react-navigation/native-stack
```

and then make a directory of Screens to import in the `Stack.Screen`

```js
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { TailwindProvider } from 'tailwindcss-react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/Home/HomeScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <TailwindProvider>
        <Stack.Navigator>
          {/* Screens */}
          <Stack.Screen name='Home' component={HomeScreen} />
        </Stack.Navigator>
      </TailwindProvider>
    </NavigationContainer>
  )
}
```