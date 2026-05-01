import { FormRow, FormSwitch } from 'enmity/components';
import { SettingsStore } from 'enmity/api/settings';
import { React } from 'enmity/metro/common';

interface SettingsProps {
   settings: SettingsStore;
}

export default ({ settings }: SettingsProps) => {
   // SecretMessage eklentisiyle %100 aynı yapıyı kullanıyoruz (Sadece FormSwitch ve getBoolean)
   return <>
      <FormRow
         label='Tarayıcı (Web)'
         subLabel='Sizi Discord Web üzerinden giriyor gibi gösterir.'
         trailing={
            <FormSwitch
               value={settings.getBoolean('spoof_web', false)}
               onValueChange={(value: boolean) => settings.set('spoof_web', value)}
            />
         }
      />
      <FormRow
         label='Android'
         subLabel='Sizi Android cihazdan giriyor gibi gösterir.'
         trailing={
            <FormSwitch
               value={settings.getBoolean('spoof_android', false)}
               onValueChange={(value: boolean) => settings.set('spoof_android', value)}
            />
         }
      />
      <FormRow
         label='iPhone (iOS)'
         subLabel='Sizi iPhone üzerinden giriyor gibi gösterir.'
         trailing={
            <FormSwitch
               value={settings.getBoolean('spoof_ios', false)}
               onValueChange={(value: boolean) => settings.set('spoof_ios', value)}
            />
         }
      />
      <FormRow
         label='Xbox'
         subLabel='Sizi Xbox üzerinden giriyor gibi gösterir.'
         trailing={
            <FormSwitch
               value={settings.getBoolean('spoof_xbox', false)}
               onValueChange={(value: boolean) => settings.set('spoof_xbox', value)}
            />
         }
      />
      <FormRow
         label='Playstation'
         subLabel='Sizi Playstation üzerinden giriyor gibi gösterir.'
         trailing={
            <FormSwitch
               value={settings.getBoolean('spoof_playstation', false)}
               onValueChange={(value: boolean) => settings.set('spoof_playstation', value)}
            />
         }
      />
   </>;
};
