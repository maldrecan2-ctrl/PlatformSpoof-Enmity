import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { getByProps } from 'enmity/metro';
import { React } from 'enmity/metro/common';
import { create } from 'enmity/patcher';
import manifest from '../manifest.json';
import Settings from './components/Settings';

const Patcher = create('PlatformSpoof');

const PlatformSpoof: Plugin = {
   ...manifest,

   onStart() {
      // Platformu varsayılan olarak desktop yapıyoruz, 
      // ileride ayarlar eklenecek ama şu an çökme yapmaması için en stabil halde
      const browserStr = "Discord Client";
      
      const superPropsModule = getByProps("getSuperProperties");
      
      if (superPropsModule) {
          Patcher.after(superPropsModule, "getSuperProperties", (self, args, res) => {
              if (res) {
                  res.browser = browserStr;
              }
              return res;
          });
      }
      
      const infoModule = getByProps("InfoDictionaryManager");
      if (infoModule && infoModule.InfoDictionaryManager) {
          Patcher.after(infoModule.InfoDictionaryManager, "getBrowser", (self, args, res) => {
              return browserStr;
          });
      }
   },

   onStop() {
      Patcher.unpatchAll();
   },

   getSettingsPanel({ settings }) {
      return <Settings settings={settings} />;
   }
};

registerPlugin(PlatformSpoof);
