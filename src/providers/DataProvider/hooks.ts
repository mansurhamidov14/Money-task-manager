import { createSignal } from "solid-js";
import { AsyncData } from "./types";
import { user } from "@app/stores";
import { HttpResponse } from "@app/services";

export function useAsyncData<T = unknown>() {
  const [asyncData, setAsyncData] = createSignal<AsyncData<T>>({
    status: "loading"
  });

  const fetchAsyncData = async (callback: () => Promise<HttpResponse<T>>): Promise<void> => {
    try {
      const response = await callback();
      setAsyncData({
        status: "success",
        data: response.data 
      });
    } catch (e: any) {
      if (e.status === 401) {
        return user.logOut();
      }
      setAsyncData({
        status: "error",
        error: e.message
      });
    }
  }

  const reset = () => {
    setAsyncData({ status: "loading" });
  }

  return [asyncData, fetchAsyncData, setAsyncData, reset] as const;
}