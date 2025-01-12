import { apiVOneBaseURL } from "@/shared/constants/general";
import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: apiVOneBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
