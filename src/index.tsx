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
      let browserStr = "Discord Client"; // Varsayılan: Bilgisayar
      
      try {
          const EnmitySettings = (window as any).enmity?.settings;
          if (EnmitySettings) {
              if (EnmitySettings.getBoolean('PlatformSpoof', 'spoof_web', false)) {
                  browserStr = "Discord Web";
              } else if (EnmitySettings.getBoolean('PlatformSpoof', 'spoof_mobile', false)) {
                  browserStr = "Discord iOS"; // Discord iOS ve Discord Android ikisi de telefon simgesi verir.
              } else if (EnmitySettings.getBoolean('PlatformSpoof', 'spoof_console', false)) {
                  browserStr = "Discord Embedded"; // Embedded konsollar için gamepad simgesi verir.
              } else if (EnmitySettings.getBoolean('PlatformSpoof', 'spoof_vr', false)) {
                  browserStr = "Discord VR";
              }
              // Eğer hiçbiri değilse veya spoof_desktop aktifse "Discord Client" olarak kalır.
          }
      } catch(e) {}
      
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
