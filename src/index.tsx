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
      // Eklenti yüklendiğinde ayarları okumak için Enmity'nin genel ayar deposunu kullanıyoruz.
      // Enmity eklentilerine settings fonksiyonları `getSettingsPanel` üzerinden veriliyor ama 
      // global `enmity/api/settings` kullanmak yerine `window.enmity.settings` da denenebilir.
      // Ancak en güvenli yol, daha önce SecretMessage'da çalışan window objesi üzerinden okumaktır.
      // Eğer yoksa varsayılan olarak desktop kalır.
      
      let platform = "desktop";
      try {
          const EnmitySettings = (window as any).enmity?.settings;
          if (EnmitySettings) {
              platform = EnmitySettings.getString('PlatformSpoof', 'platform', 'desktop');
          }
      } catch(e) {}

      let browserStr = "Discord Client";
      
      switch (platform) {
          case "desktop":    browserStr = "Discord Client"; break;
          case "web":        browserStr = "Discord Web"; break;
          case "ios":        browserStr = "Discord iOS"; break;
          case "android":    browserStr = "Discord Android"; break;
          case "xbox":       browserStr = "Discord Embedded"; break;
          case "playstation":browserStr = "Discord Embedded"; break;
          case "vr":         browserStr = "Discord VR"; break;
          default:           browserStr = "Discord Client"; break;
      }
      
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
