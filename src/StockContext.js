import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const StockContext = createContext();

// Provider component
export const StockProvider = ({ children }) => {
  const [stockPrice, setStockPrice] = useState(100);
  const [myCash, setMyCash] = useState(1000);
  const [priceHistory, setPriceHistory] = useState([]);
  const [sharesOwned, setSharesOwned] = useState(0);
  const [sharesToBuy, setSharesToBuy] = useState(0);
  const [sharesToSell, setSharesToSell] = useState(0);
  const [buyPrice, setBuyPrice] = useState(null);
  const [profitLoss, setProfitLoss] = useState(0);

  // Similar to the original updateStockPrice function
  const updateStockPrice = () => {
    // Generate a random number between -1 and 1
    const priceChange = (Math.random() * 2 - 1);
    const newPrice = parseFloat(stockPrice) + priceChange;
    setStockPrice(newPrice.toFixed(2));
  
    // If shares are owned, calculate the profit or loss
    if (sharesOwned > 0) {
      setProfitLoss(((newPrice - buyPrice) * sharesOwned).toFixed(2));
    }
  };

  useEffect(() => {
    const newPrice = parseFloat(stockPrice);
    setPriceHistory((currentHistory) => [
      ...currentHistory,
      { timestamp: new Date().toLocaleTimeString(), price: newPrice },
    ]);

    const newPullInterval = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
    const intervalId = setInterval(updateStockPrice, newPullInterval);

    return () => clearInterval(intervalId);
  }, [stockPrice]);

  const handleBuy = (sharesToBuy) => {
    const price = parseFloat(stockPrice); // Convert string to float
    const totalCost = price * sharesToBuy;
    if (myCash >= totalCost) {
      setSharesOwned(sharesOwned + sharesToBuy);
      setBuyPrice(price); // Record the buy price
      setMyCash((cash) => parseFloat((cash - totalCost).toFixed(2))); // Ensure subtraction is in float and format to two decimals
    } else {
      // Handle the case where there is not enough cash to buy
      alert("Not enough cash to buy " + sharesToBuy + " shares.");
    }
  };
  

  const handleSell = (sharesToSell) => {
    const price = parseFloat(stockPrice); // Convert string to float
    const totalReturn = price * sharesToSell;
    if (sharesOwned >= sharesToSell) {
      setSharesOwned(sharesOwned - sharesToSell);
      setMyCash((cash) => parseFloat((cash + totalReturn).toFixed(2))); // Ensure addition is in float and format to two decimals
      if (sharesOwned === sharesToSell) {
        // If all shares are sold, reset buy price and profit/loss
        setBuyPrice(null);
        setProfitLoss(0);
      }
    } else {
      // Handle the case where the user tries to sell more shares than they own
      alert("Not enough shares to sell " + sharesToSell + " shares.");
    }
  };

  
  const handleBuyClick = () => {
    // Convert the input to a number and then call handleBuy
    handleBuy(Number(sharesToBuy));
  };

  const handleSellClick = () => {
    // Convert the input to a number and then call handleSell
    handleSell(Number(sharesToSell));
  };

  // Context value
  const contextValue = {
    stockPrice,
    myCash,
    priceHistory,
    sharesOwned,
    buyPrice,
    profitLoss,
    sharesToBuy,
    sharesToSell,
    handleBuyClick,
    handleSell,
    handleSellClick,
    setSharesToBuy,
    setSharesToSell
  };

  return (
    <StockContext.Provider value={contextValue}>
      {children}
    </StockContext.Provider>
  );
};
