import { FormRow, FormSwitch } from 'enmity/components';
import { SettingsStore } from 'enmity/api/settings';
import { React } from 'enmity/metro/common';

interface SettingsProps {
   settings: SettingsStore;
}

export default ({ settings }: SettingsProps) => {
   return <>
      <FormRow
         label='Platform Spoof'
         subLabel='Bilgisayardan giriyor gibi görünmenizi sağlar. (Gelecek sürümde cihaz seçimi eklenecek)'
         trailing={
            <FormSwitch
               value={settings.getBoolean('enabled', true)}
               onValueChange={(value: boolean) => settings.set('enabled', value)}
            />
         }
      />
   </>;
};
