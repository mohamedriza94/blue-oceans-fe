import { create } from "zustand";
import Cookies from "js-cookie";

type TTokenStore = {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  clearAccessToken: () => void;
};

export const useTokenStore = create<TTokenStore>()((set) => ({
  accessToken: Cookies.get("accessToken") || null,
  setAccessToken: (accessToken: string) => {
    Cookies.set("accessToken", accessToken, { expires: 1, secure: true });
    set({ accessToken });
  },
  clearAccessToken: () => {
    Cookies.remove("accessToken");
    set({ accessToken: null });
  },
}));
