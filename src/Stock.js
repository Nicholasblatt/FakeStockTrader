import React, { useContext } from 'react';
import { StockContext } from './StockContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Stock = () => {
  const {
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
    setSharesToSell,
  } = useContext(StockContext);
  

  return (
    <div className="main-content">
      <h1>Stock Trading</h1>
      <p>My Current Cash: <span className="cash-value">${(myCash).toFixed(2)}</span></p>
      <p>Current Stock Price: <span className="stock-price">${parseFloat(stockPrice).toFixed(2)}</span></p>
      <p>Shares Owned: <span className="shares-owned">{sharesOwned}</span></p>
      {sharesOwned > 0 && (
        <div>
            <p>
            Average Buy Price: <span className="buy-price">${buyPrice}</span> | Current 
            <span className={profitLoss >= 0 ? "profit" : "loss"}>
              {profitLoss >= 0 ? " Profit: " : " Loss: "}${Math.abs(profitLoss).toFixed(2)}
            </span>
            </p>
            <div className="input-container">
          <input
            type="number"
            value={sharesToSell}
            onChange={(e) => setSharesToSell(e.target.value)}
            min="0"
            max={sharesOwned}
          />
          <button className="sell-button" onClick={handleSellClick}>Sell Shares</button>
        </div>
        <button className="sell-all-button" onClick={() => handleSell(sharesOwned)}>Sell All Shares</button>
      </div>
      )}
    <div className="input-container">
        <input
            type="number"
            value={sharesToBuy}
            onChange={(e) => setSharesToBuy(e.target.value)}
            min="0"
        />
        <button className="buy-button" onClick={handleBuyClick}>Buy Shares</button>
    </div>
      <div className="chart-container">
        <LineChart
          width={1000}
          height={400}
          data={priceHistory}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            isAnimationActive={false}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default Stock;
