export type Nullable<T> = T | null | undefined;

export type StringOrNumber = string | number;

export type StringOrNull = string | null;

export type NullableString = StringOrNull | undefined;

export type StringOrUndefined = string | undefined;

export type Fn = (...args: any[]) => any;

export type Yn = "Y" | "N";

export interface Promisable {
  resolve: () => any;
}

export type NullableBoolean = boolean | null | undefined;

export type NullableNumber = number | null | undefined;

export interface WithoutDefinition {
  [key: string]: any;
}

export type Dic<T extends string | number> = {
  [key in T]: any;
};

export enum Os {
  PC = "PC",
  ANDROID = "Android",
  iOS = "iOS",
}

export enum Permission {
  FCM = "fcm",
  CALENDAR = "calendar",
  CAMERA = "camera",
  CONTACTS = "contacts",
  LOCATION = "location",
  LOCATION_ALWAYS = "locationAlways",
  LOCATION_WHEN_IN_USE = "locationWhenInUse",
  MEDIA_LIBRARY = "mediaLibrary",
  MICROPHONE = "microphone",
  PHONE = "phone",
  PHOTOS = "photos",
  PHOTOS_ADD_ONLY = "photosAddOnly",
  REMINDERS = "reminders",
  SENSORS = "sensors",
  SMS = "sms",
  SPEECH = "speech",
  STORAGE = "storage",
  IGNORE_BATTERY_OPTIMIZATIONS = "ignoreBatteryOptimizations",
  NOTIFICATION = "notification",
  ACCESS_MEDIA_LOCATION = "accessMediaLocation",
  ACTIVITY_RECOGNITION = "activityRecognition",
  UNKNOWN = "unknown",
  BLUETOOTH = "bluetooth",
  MANAGE_EXTERNAL_STORAGE = "manageExternalStorage",
  SYSTEM_ALERT_WINDOW = "systemAlertWindow",
  REQUEST_INSTALL_PACKAGES = "requestInstallPackages",
  APP_TRACKING_TRANSPARENCY = "appTrackingTransparency",
  CRITICAL_ALERTS = "criticalAlerts",
  ACCESS_NOTIFICATION_POLICY = "accessNotificationPolicy",
  BLUETOOTH_SCAN = "bluetoothScan",
  BLUETOOTH_ADVERTISE = "bluetoothAdvertise",
  BLUETOOTH_CONNECT = "bluetoothConnect",
  NEARBY_WIFI_DEVICES = "nearbyWifiDevices",
  VIDEOS = "videos",
  AUDIO = "audio",
  SCHEDULE_EXACT_ALARM = "scheduleExactAlarm",
}

//암호화
export const cryptoInfo = {
  ENCRYPTION_KEY:
    import.meta.env.VUE_APP_ENCRYPTION_KEY || "localianTravel".repeat(2), // 키를 어디다 두지
  IV_LENGTH: 16,
};

export const Replacer = {
  BR: {
    from: /\r\n/g,
    to: "<br>",
  },
};
