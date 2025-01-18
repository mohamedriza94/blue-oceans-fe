import { envData } from "./env-data";

export const apiVOneBaseURL = `${envData.mainBaseURL}${envData.mainBasePath}`;

export const currentYear = new Date().getFullYear();

export const logos = {
  mainLogoTransparent: "/logos/main-logo-transparent-bg.png",
  symbolOnlyTransparent: "/logos/main-logo-transparent-bg.png",
};

export const stripePublishableKey =
  "pk_test_51NCjJkDLmpqUhqxy2JsMytiHeg6Dj7Wp4ERTC7E59SJxyLP90oyDRgc9dhLfPnGpxqIA6SSq8qD4CCssmaMOksh800mKTMUYVz";
