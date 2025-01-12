import { envData } from "./env-data";

export const apiVOneBaseURL = `${envData.mainBaseURL}${envData.mainBasePath}`;

export const currentYear = new Date().getFullYear();

export const logos = {
  mainLogoTransparent: "/logos/main-logo-transparent-bg.png",
  symbolOnlyTransparent: "/logos/main-logo-transparent-bg.png",
};
