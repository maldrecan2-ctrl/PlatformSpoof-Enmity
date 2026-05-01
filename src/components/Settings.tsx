import { FormRow } from 'enmity/components';
import { SettingsStore } from 'enmity/api/settings';
import { React } from 'enmity/metro/common';

interface SettingsProps {
   settings: SettingsStore;
}

export default ({ settings }: SettingsProps) => {
   const [currentPlatform, setCurrentPlatform] = React.useState(settings.getString('platform', 'desktop'));

   const handleSelect = (val: string) => {
       settings.set('platform', val);
       setCurrentPlatform(val);
   };

   return <>
       <FormRow 
          label='Geçerli Cihaz' 
          subLabel={`Şu an seçili olan: ${currentPlatform.toUpperCase()} (Değiştirdikten sonra uygulamayı kapatıp açın)`} 
       />
       
       <FormRow 
          label='Bilgisayar (Desktop)' 
          subLabel={currentPlatform === 'desktop' ? '✅ Aktif' : 'Seçmek için dokunun'} 
          onPress={() => handleSelect('desktop')} 
       />
       <FormRow 
          label='Tarayıcı (Web)' 
          subLabel={currentPlatform === 'web' ? '✅ Aktif' : 'Seçmek için dokunun'} 
          onPress={() => handleSelect('web')} 
       />
       <FormRow 
          label='Android' 
          subLabel={currentPlatform === 'android' ? '✅ Aktif' : 'Seçmek için dokunun'} 
          onPress={() => handleSelect('android')} 
       />
       <FormRow 
          label='iPhone (iOS)' 
          subLabel={currentPlatform === 'ios' ? '✅ Aktif' : 'Seçmek için dokunun'} 
          onPress={() => handleSelect('ios')} 
       />
       <FormRow 
          label='Xbox' 
          subLabel={currentPlatform === 'xbox' ? '✅ Aktif' : 'Seçmek için dokunun'} 
          onPress={() => handleSelect('xbox')} 
       />
       <FormRow 
          label='Playstation' 
          subLabel={currentPlatform === 'playstation' ? '✅ Aktif' : 'Seçmek için dokunun'} 
          onPress={() => handleSelect('playstation')} 
       />
   </>;
};
