import { FormRow } from "enmity/components";
import { SettingsStore } from "enmity/api/settings";
import { React } from "enmity/metro/common";
import { ScrollView, View, Text } from "react-native";

interface SettingsProps {
   settings: SettingsStore;
}

export default ({ settings }: SettingsProps) => {
    // In Enmity, there is no FormSelect out of the box that works perfectly, 
    // but we can use FormRow with a simple state or just toggle between popular ones.
    // However, since we want multiple options, we can list them as selectable rows.
    
    const [currentPlatform, setCurrentPlatform] = React.useState(settings.getString("platform", "desktop"));

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

    return (
        <ScrollView style={{ padding: 16 }}>
            <View style={{ marginBottom: 16 }}>
                <Text style={{ color: "#fff", marginBottom: 8, fontSize: 16, fontWeight: "bold" }}>
                    Select Spoofed Platform
                </Text>
                <Text style={{ color: "#aaa", marginBottom: 16, fontSize: 14 }}>
                    Choose the platform icon that will be displayed to others. (Requires app restart to take effect)
                </Text>
                
                {options.map((opt) => (
                    <FormRow
                        key={opt.value}
                        label={opt.label}
                        subLabel={currentPlatform === opt.value ? "Selected" : ""}
                        onPress={() => handleSelect(opt.value)}
                    />
                ))}
            </View>
        </ScrollView>
    );
};
