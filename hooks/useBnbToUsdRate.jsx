import { useCallback, useState, useEffect } from "react";

const useBnbToUsdRate = () => {
  const [bnbToUsdRate, setBnbToUsdRate] = useState(0);
  const [isLoading, setIsLoading] = useState(false)

  const fetchBnbToUsdRate = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd"
      );
      const data = await response.json();
      setBnbToUsdRate(data?.binancecoin?.usd);
    } catch (error) {
      console.error("Failed to fetch BNB to USD rate", error);
    } finally {
      setIsLoading(false)
    }
  },[]);

  useEffect(() => {
    fetchBnbToUsdRate();
  }, []);

  return {bnbToUsdRate, isLoading};
};

export default useBnbToUsdRate;
