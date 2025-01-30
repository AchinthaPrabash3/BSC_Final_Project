import { useEffect, useState } from "react";

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const featchData = async () => {
    setIsLoading(true);
    try {
      const responce = await fn;
      setData(responce);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    featchData();
  }, []);
  const reFeatch = () => featchData();
  return { data, isLoading, reFeatch };
};

export default useAppwrite;
