import { HttpResponse } from "@app/services";
import { createSignal } from "solid-js";
import { AsyncData } from "./types";

export function useAsyncData<T = unknown>() {
  const [asyncData, setAsyncData] = createSignal<AsyncData<T>>({
    status: "initial"
  });

  const fetchAsyncData = async (callback: () => Promise<HttpResponse<T>>): Promise<void> => {
    try {
      const response = await callback();
      setAsyncData({
        status: "success",
        data: response.data 
      });
    } catch (e: any) {
      console.error(e);
      setAsyncData({
        status: "error",
        error: e.message
      });
    }
  }
  

  const reload = () => {
    setAsyncData({ status: "initial" });
  }

  const waitForUpdate = () => {
    setAsyncData({ status: "loading" });
  }

  return [asyncData, fetchAsyncData, setAsyncData, reload, waitForUpdate] as const;
}