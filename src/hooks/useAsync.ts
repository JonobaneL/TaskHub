import { FirestoreDocType } from "@/firebase";
import { useCallback, useEffect, useState } from "react";

type AsyncHookResponse<T> = [boolean, Error | undefined, T | undefined];

export const useAsync = <T>(
  callback: () => Promise<any>,
  dependencies: any[] = []
): AsyncHookResponse<T> => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();
  const [value, setValue] = useState<T | undefined>();

  const callbackMemorized = useCallback(() => {
    setIsLoading(true);
    setError(undefined);
    setValue(undefined);
    callback()
      .then((data) => {
        if (data.forEach) {
          const res: any[] = [];
          data.forEach((item: FirestoreDocType) => {
            const doc = Object.assign({}, item?.data());
            res.push({ id: item?.id, ...doc });
          });
          return res;
        }
        const doc = Object.assign({}, data?.data());
        return { id: data?.id, ...doc };
      })
      .then((res) => {
        setValue(res);
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, dependencies);
  useEffect(() => {
    callbackMemorized();
  }, [callbackMemorized]);
  return [isLoading, error, value];
};
