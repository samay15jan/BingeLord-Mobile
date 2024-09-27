import React from 'react';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import AntDesign from '@expo/vector-icons/AntDesign';
import { FiltersEngine, Request } from '@cliqz/adblocker';
import { router } from 'expo-router'

export default function StreamContent({type, id}) {
  const URL = `https://vidsrc.net/embed/${type}?tmdb=${id}`

  return (
    <SafeAreaView 
      style={{    
        flex: 1,
        backgroundColor: '#0d1017',
      }}
    >
          <AntDesign 
            onPress={() => router.canGoBack() && router.back()} 
            name="closesquare" 
            style={{ 
              position: 'absolute', 
              top: 10,
              right: 10,
              zIndex: 1
            }}
            size={30} 
            color="white"
          />
          {URL &&
            <AdBlockingWebView
              source={{ uri: URL }}
              style={{
                flex: 1,
                backgroundCOlor: '#121212',
            }}
            />
          }
    </SafeAreaView >
  );
}

const AdBlockingWebView = ({ source, ...props }) => {
  const [engine, setEngine] = React.useState(null);

  React.useEffect(() => {
    const initEngine = async () => {
      const adblockEngine = await FiltersEngine.fromPrebuiltAdsOnly(fetch);
      setEngine(adblockEngine);
    };

    initEngine();
  }, []);

  const onShouldStartLoadWithRequest = (request) => {
    if (!engine) return true;

    const { url, mainDocumentUrl } = request;

    const requestDetails = Request.fromRawDetails({
      type: request.type,
      url: url || mainDocumentUrl,
    });

    const { match } = engine.match(requestDetails);
    if (match) {
      return false;
    }

    return true;
  };

  return (
    <WebView
      source={source}
      {...props}
      onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
      incognito
      allowsFullscreenVideo
      allowsAirPlayForMediaPlayback
      allowsPictureInPictureMediaPlayback
      forceDarkOn
    />
  );
};
