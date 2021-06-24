import {useCallback, useEffect, useRef, useState} from 'react';

interface ILoadDataResult<Data, Error> {
  data: Data | undefined;
  error: Error | undefined;
  isLoading: boolean;
}

export const useLoadData = <Data, Error>(loadData: () => Promise<Data>): ILoadDataResult<Data, Error> => {
  const [data, setData] = useState<Data | undefined>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const isMountRef = useRef(true);

  const cancelableLoadData = useCallback(() => {
    if (!isMountRef.current) {
      return;
    }

    setLoading(true);

    loadData()
      .then((responseData) => {
        if (isMountRef.current) {
          setLoading(false);
          setData(responseData);
        }
      })
      .catch((e: Error) => {
        if (isMountRef.current) {
          setLoading(false);
          setError(e);
        }
      });
  }, [loadData]);

  useEffect(() => {
    cancelableLoadData();

    return () => {
      isMountRef.current = false;
    };
  }, [cancelableLoadData]);

  return {data, isLoading, error};
};
