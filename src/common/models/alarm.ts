export interface alarmConfig {
  message: String;
  title: String;
  hour: hour;
  minute: minute;
  day: day;
}

type hour = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface minute {
  1: number;
  2: number;
}

interface day {
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thu: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
}
