'use client';

import React, { useState } from 'react';
import { Button, Card } from '@mfe/shared-components';
import type { UserSettings } from '@mfe/shared-types';

export default function SettingsRoot() {
  const [settings, setSettings] = useState<UserSettings>({
    theme: 'light',
    language: 'en',
    notifications: true,
  });

  const [saved, setSaved] = useState(false);

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setSettings({ ...settings, theme });
    setSaved(false);
  };

  const handleLanguageChange = (language: string) => {
    setSettings({ ...settings, language });
    setSaved(false);
  };

  const handleNotificationsChange = (notifications: boolean) => {
    setSettings({ ...settings, notifications });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="mb-2 text-2xl font-bold">Settings</h2>
        <p className="text-gray-600">
          Customize your preferences. Changes will be synced across all micro-frontends.
        </p>
      </Card>

      <Card>
        <h3 className="mb-4 text-lg font-semibold">Appearance</h3>
        <div className="space-y-3">
          <div>
            <label className="mb-2 block text-sm font-medium">Theme</label>
            <div className="flex gap-3">
              {(['light', 'dark'] as const).map((theme) => (
                <button
                  key={theme}
                  onClick={() => handleThemeChange(theme)}
                  className={`rounded px-4 py-2 capitalize font-medium transition-colors ${
                    settings.theme === theme
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 text-lg font-semibold">Localization</h3>
        <div>
          <label className="mb-2 block text-sm font-medium">Language</label>
          <select
            value={settings.language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="w-full rounded border border-gray-200 px-3 py-2"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="pl">Polish</option>
            <option value="de">German</option>
          </select>
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 text-lg font-semibold">Notifications</h3>
        <label className="flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => handleNotificationsChange(e.target.checked)}
            className="mr-3 h-4 w-4"
          />
          <span className="font-medium">Enable notifications</span>
        </label>
        <p className="mt-2 text-sm text-gray-600">
          Receive alerts about orders and system updates
        </p>
      </Card>

      {saved && (
        <div className="rounded-lg bg-green-100 p-4 text-green-800">
          ✓ Settings saved successfully!
        </div>
      )}

      <Button onClick={handleSave} className="w-full py-3">
        Save Settings
      </Button>

      <Card>
        <h3 className="mb-3 text-sm font-semibold text-gray-600">Current Settings</h3>
        <pre className="rounded bg-gray-100 p-3 text-xs overflow-x-auto">
          {JSON.stringify(settings, null, 2)}
        </pre>
      </Card>
    </div>
  );
}
