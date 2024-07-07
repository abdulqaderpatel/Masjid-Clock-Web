import type Namaz from "@/models/Namaz";
import Sunrise from "@/assets/sunrise.png";
import Sunset from "@/assets/sunset.png";

export const namazData: Namaz[] = [
  {
    name: "Fajr",
    icon: Sunrise,
    time: "5:37 am",
  },
  {
    name: "Duhur",
    icon: Sunset,
    time: "1:34 pm",
  },
  {
    name: "Asr",
    icon: Sunrise,
    time: "5:37 pm",
  },
  {
    name: "Maghrib",
    icon: Sunset,
    time: "7:20 pm",
  },
  {
    name: "Isha",
    icon: Sunrise,
    time: "9:15 pm",
  },
];
