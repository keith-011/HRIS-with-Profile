import axios from "axios";
import { useEffect, useState } from "react";
import { ToastHandleAxiosCatch } from "../utils/ToastFunctions";

export const useFetchData = <T>(url: string, refresh: boolean) => {
  const [tableData, setTableData] = useState<T[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const fetchData = await axios.get(url, {
          signal: controller.signal,
        });
        setTableData(fetchData.data.rows);
      } catch (error) {
        setError(ToastHandleAxiosCatch(error));
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [url, refresh]);

  return { tableData, isLoading, isError };
};
