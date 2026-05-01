import { FormRow } from "enmity/components";
import { SettingsStore } from "enmity/api/settings";
import { React } from "enmity/metro/common";

interface SettingsProps {
   settings: SettingsStore;
}

export default ({ settings }: SettingsProps) => {
    const [currentPlatform, setCurrentPlatform] = React.useState(settings.get("platform", "desktop"));

    const options = [
        { label: "Desktop", value: "desktop" },
        { label: "Web", value: "web" },
        { label: "Android", value: "android" },
        { label: "iOS", value: "ios" },
        { label: "Xbox", value: "xbox" },
        { label: "Playstation", value: "playstation" },
        { label: "VR", value: "vr" }
    ];

    const handleSelect = (value: string) => {
        settings.set("platform", value);
        setCurrentPlatform(value);
    };

    return <>
        <FormRow 
            label="Current Platform" 
            subLabel={`Spoofing as: ${currentPlatform}`} 
        />
        {options.map((opt) => (
            <FormRow
                key={opt.value}
                label={opt.label}
                subLabel={currentPlatform === opt.value ? "Selected (Restart App to Apply)" : "Tap to select"}
                onPress={() => handleSelect(opt.value)}
            />
        ))}
    </>;
};
