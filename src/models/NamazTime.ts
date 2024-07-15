export default interface NamazTime {
  id: number;
  user_id: number;
  date: Date;
  fajr_namaz: string;
  fajr_jamat: string;
  zuhr_namaz: string;
  zuhr_jamat: string;
  asr_namaz: string;
  asr_jamat: string;
  maghrib_namaz: string;
  maghrib_jamat: string;
  isha_namaz: string;
  isha_jamat: string;
}
