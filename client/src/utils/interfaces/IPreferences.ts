export interface ILocalStoragePreferences {
  weather: {
    unit: string;
    query_type: string;
    query: string | { latitude: number; longitude: number };
  };
}
