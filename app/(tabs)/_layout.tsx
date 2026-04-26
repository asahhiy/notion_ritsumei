import React from "react";

import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Schedule</Label>
        <Icon sf="book.pages.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="add">
        <Icon sf="checklist" drawable="custom_settings_drawable" />
        <Label>Tasks</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <Icon sf="gear" drawable="custom_settings_drawable" />
        <Label>Settings</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="debug">
        <Icon sf="ladybug" drawable="custom_settings_drawable" />
        <Label>Debug</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
