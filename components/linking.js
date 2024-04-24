import React, {useCallback} from 'react';
import {Alert, Button, Linking, StyleSheet, View, Text} from 'react-native';

const supportedURL = 'https://www.example.com';

const unsupportedURL = 'slack://open?team=123456';

const useInitialURL = () => {
  const [url, setUrl] = React.useState(null);
  const [processing, setProcessing] = React.useState(true);

  React.useEffect(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl);
        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();
  }, []);

  return {url, processing};
};

const OpenURLButton = ({url, children}) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

const SendIntentButton = ({action, extras, children}) => {
  const handlePress = React.useCallback(async () => {
    try {
      await Linking.sendIntent(action, extras);
    } catch (e) {
      Alert.alert(e.message);
    }
  }, [action, extras]);

  return <Button title={children} onPress={handlePress} />;
};

export const LinkingTest = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{color: 'red', padding: 20}}
        onPress={() =>
          Linking.openURL(
            'https://shopee.ph/HUAWEI-MateBook-D-16-2024-Laptop-12th-13th-Gen-Intel%C2%AE-Core%E2%84%A2-i5-i9-Processor-8GB-16GB-512GB-1TB-i.127208192.25703373703',
          )
        }>
        Shopee
      </Text>
      <Text
        style={{color: 'red', padding: 20}}
        onPress={() =>
          Linking.openURL(
            'https://www.lazada.com.ph/products/coffee-womens-fashion-crew-neck-t-shirt-i3877460697-s24312997682.html',
          )
        }>
        Lazada
      </Text>
      <OpenURLButton url={supportedURL}>Open Supported URL</OpenURLButton>
      <OpenURLButton url={unsupportedURL}>Open Unsupported URL</OpenURLButton>
    </View>
  );
  // const {url: initialUrl, processing} = useInitialURL();
  // return (
  //   <View style={styles.container}>
  //     <Text>
  //       {processing
  //         ? 'Processing the initial url from a deep link'
  //         : `The deep link is: ${initialUrl || 'None'}`}
  //     </Text>
  //   </View>
  // );
  // return (
  //   <View style={styles.container}>
  //     <SendIntentButton action="android.intent.action.POWER_USAGE_SUMMARY">
  //       Power Usage Summary
  //     </SendIntentButton>
  //     <SendIntentButton
  //       action="android.settings.APP_NOTIFICATION_SETTINGS"
  //       extras={[
  //         {
  //           key: 'android.provider.extra.APP_PACKAGE',
  //           value: 'com.facebook.katana',
  //         },
  //       ]}>
  //       App Notification Settings
  //     </SendIntentButton>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
