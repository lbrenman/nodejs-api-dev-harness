import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';

const finnhubToken = process.env.FINNHUBTOKEN

export async function getQuote(symbol) {
  try {
    const apiUrl1 = `https://finnhub.io/api/v1/quote?symbol=${symbol}`;
    const apiUrl2 = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}`;

    // Call Finnhub quote and profile API's
    const [response1, response2] = await Promise.all([
      axios.get(apiUrl1, { headers: { "X-Finnhub-Token": finnhubToken } }),
      axios.get(apiUrl2, { headers: { "X-Finnhub-Token": finnhubToken } })
    ]);

    // Process response
    const data = {
      Price: response1.data.c,
      Change: response1.data.d,
      ChangePercent: response1.data.dp,
      DayHigh: response1.data.h,
      DayLow: response1.data.l,
      OpenPrice: response1.data.o,
      PreviousClose: response1.data.pc,
      Symbol: response2.data.ticker,
      Name: response2.data.name
    };
    return { success: true, data: data }
  } catch (error) {
    return { success: false, data: error }
  }
}
