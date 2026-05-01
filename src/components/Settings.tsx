import { FormRow } from 'enmity/components';
import { SettingsStore } from 'enmity/api/settings';
import { React } from 'enmity/metro/common';

interface SettingsProps {
   settings: SettingsStore;
}

export default ({ settings }: SettingsProps) => {
   // Enmity'nin çökmemsi için React Hooks (useState) ve bilinmeyen settings metodlarını kullanmıyoruz.
   let currentPlatform = 'desktop';
   try {
       // Global ayar objesinden okumaya çalış
       const EnmitySettings = (window as any).enmity?.settings;
       if (EnmitySettings) {
           currentPlatform = EnmitySettings.get('PlatformSpoof', 'platform', 'desktop');
       }
   } catch(e) {}

   const handleSelect = (val: string) => {
       try {
           settings.set('platform', val);
           // Kullanıcıya seçildiğini hissettirmek için menüde işlem yapıldı
           // Not: React state kullanılmadığı için yanındaki "Seçili" yazısı anında değişmez,
           // ancak menüye tekrar girildiğinde güncellenmiş olur.
       } catch(e) {}
   };

   return <>
       <FormRow 
          label='Geçerli Cihaz' 
          subLabel={`Şu an seçili olan: ${currentPlatform.toUpperCase()} (Değiştirdikten sonra Discord'u tamamen kapatıp açın)`} 
       />
       
       <FormRow 
          label='Bilgisayar (Desktop)' 
          subLabel={currentPlatform === 'desktop' ? '✅ Seçili' : 'Seçmek için dokunun'} 
          onPress={() => handleSelect('desktop')} 
       />
       <FormRow 
          label='Tarayıcı (Web)' 
          subLabel={currentPlatform === 'web' ? '✅ Seçili' : 'Seçmek için dokunun'} 
          onPress={() => handleSelect('web')} 
       />
       <FormRow 
          label='Android' 
          subLabel={currentPlatform === 'android' ? '✅ Seçili' : 'Seçmek için dokunun'} 
          onPress={() => handleSelect('android')} 
       />
       <FormRow 
          label='iPhone (iOS)' 
          subLabel={currentPlatform === 'ios' ? '✅ Seçili' : 'Seçmek için dokunun'} 
          onPress={() => handleSelect('ios')} 
       />
       <FormRow 
          label='Xbox' 
          subLabel={currentPlatform === 'xbox' ? '✅ Seçili' : 'Seçmek için dokunun'} 
          onPress={() => handleSelect('xbox')} 
       />
       <FormRow 
          label='Playstation' 
          subLabel={currentPlatform === 'playstation' ? '✅ Seçili' : 'Seçmek için dokunun'} 
          onPress={() => handleSelect('playstation')} 
       />
   </>;
};
