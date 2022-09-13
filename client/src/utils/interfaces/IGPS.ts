export interface ILocalStorageGPS {
  components: ILocalStorageGPSComponents;
  annotations: ILocalStorageGPSAnnotations;
}

interface ILocalStorageGPSComponents {
  continent: string;
  country: string;
  country_code: string;
  county: string;
  postcode: string;
  region: string;
  city: string;
}

interface ILocalStorageGPSAnnotationsDMS {
  lat: string;
  lng: string;
}

interface ILocalStorageGPSAnnotationsCurrency {
  iso_code: string;
  name: string;
  subunit: string;
  subunit_to_unit: number;
  symbol: string;
}

interface ILocalStorageGPSAnnotationsSunTimestamps {
  apparent: number;
  astronomical: number;
  civil: number;
  nautical: number;
}

interface ILocalStorageGPSAnnotationsSun {
  rise: ILocalStorageGPSAnnotationsSunTimestamps;
  set: ILocalStorageGPSAnnotationsSunTimestamps;
}

interface ILocalStorageGPSAnnotations {
  DMS: ILocalStorageGPSAnnotationsDMS;
  callingCode: number;
  currency: ILocalStorageGPSAnnotationsCurrency;
  flag: string;
  qibla: number;
  sun: ILocalStorageGPSAnnotationsSun;
}
