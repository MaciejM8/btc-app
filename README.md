# Simple Bitcoin Analysing App with Twitter News containing "BREAKING" key word.

# Technologies
- **.env file containing api keys**
- [React.js](https://reactjs.org/)
- [Chart.js](https://www.chartjs.org/)
- [Tweepy](https://www.tweepy.org/) -> (python based twitter search api). And [TwitterApi](https://developer.twitter.com/en/docs/twitter-api/tools-and-libraries/v2) documentation
- [Flask](https://flask.palletsprojects.com/en/2.1.x/) Backend 
- [Python](https://www.python.org/) Backend code to fetch all needed data
- [React-3d-hover](https://www.npmjs.com/package/react-3d-hover) Hover mechanics, it was used for fun and learning
- [GlassnodeApi](https://docs.glassnode.com/basic-api/api) Fetch chart data
- [CoingeckoApi](https://www.coingecko.com/en/api) Fetch actual bitcoin price
- [FearAndGreedIndexAPI](https://api.alternative.me/fng/) Fetch new index data from fear and greed index 

## Project Description
- Backend is build with Flask and Python, main purpose is to fetch data from different places needed for the aplication to work.
- **Main focus of the App is analysing bitcoin price and understanding its price structure.**
- You land on first section represents basic price information and market cap values fetched with Coingecko Api,and Twitter Api with simple 30 top twitter news containing "Breaking" word.
- Below that there is top placed Date picker with range From Last Year till present time and there are five Charts. Charts are Builded with Chart.js library, data to build each chart comes from Glassnode. 
- At Last there is Fear and Greed index at the bottom. I used the data and made my own version from it. Index is showing investors sentiment at the 24h period.

## What You Need to get App to work
- **.env** (TWITTER_KEY, API_KEY - for glassnodeApi) - it is used in Python app Backend
- [TWITTER_KEY](https://developer.twitter.com/en/docs/twitter-api/getting-started/getting-access-to-the-twitter-api) - from twitter developer account, when You create account u will get twitter keys to use them with api
- [API_KEY](https://docs.glassnode.com/basic-api/api-key) Glassnode section "How to get Api key" at the top

### Finished project is hosted [HERE](http://btc.maciejmusialart.com/)
