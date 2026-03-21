import React from 'react';

import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Schedule</Label>
        <Icon sf="book.pages.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="add">
        <Icon sf="plus.circle" drawable="custom_settings_drawable" />
        <Label>Add</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <Icon sf="gear" drawable="custom_settings_drawable" />
        <Label>Settings</Label>
      </NativeTabs.Trigger>

    </NativeTabs>
  );
}
