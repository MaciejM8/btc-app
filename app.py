from flask import *
from flask import Flask
from json import *
from pycoingecko import CoinGeckoAPI
from flask_apscheduler import APScheduler
import requests
import pandas as pd
import math
import re
import tweepy
import os
from dotenv import load_dotenv


load_dotenv()


def get_client():

    twitter_key = os.getenv('TWITTER_KEY')
    if twitter_key is None:
        raise Exception(
            "Please provide Twitter bearer token into environmental variables")
    client = tweepy.Client(twitter_key)
    return client


def search_tweets(query):
    client = get_client()
    tweets = client.search_recent_tweets(query=query, tweet_fields=['context_annotations', 'created_at'], media_fields=[
                                         'preview_image_url'], expansions=["attachments.media_keys", "author_id"], max_results=30)
    tweet_data = tweets.data

    results = []
    final_results = []

    author_ids = []

    if not tweet_data is None and len(tweet_data) > 0:
        for tweet in tweet_data:
            obj = {}
            obj['text'] = tweet.text
            obj['unique_author_id'] = tweet.author_id
            obj["created_at"] = tweet.created_at
            author_ids.append(tweet.author_id)

            results.append(obj)
        authors = client.get_users(ids=author_ids)
        for author in authors.data:
            tweet = filter(
                lambda x: x['unique_author_id'] == author.id, results)
            for tweet_username in tweet:
                tweet_username['author_name'] = author.username
                final_results.append(tweet_username)

    else:
        return []
    return results


tweets = search_tweets(
    '"BREAKING Bitcoin" -is:reply -is:retweet lang:en')


tweets_list = [tweet for tweet in tweets]
tweets_list_unique_authors = list(
    {v['unique_author_id']: v for v in tweets_list}.values())
tweets_list_unique_authors = tweets_list_unique_authors[:20]

# flask app


app = Flask(__name__)
application = app  # our hosting requires application in passenger_wsgi


class Config:
    SCHEDULER_API_ENABLED = True


app.config.from_object(Config())
scheduler = APScheduler()

# glass node api key
api_key = os.getenv('API_KEY')
if api_key is None:
    raise Exception(
        "Please provide glass node api key into environmental variables")

coin_gecko_client = CoinGeckoAPI()


# active adresses
active_adresses_flag = False
while active_adresses_flag == False:
    try:

        print('****active adresses****')
        print('collecting data..')

        active_adresses_url = 'https://api.glassnode.com/v1/metrics/addresses/active_count'
        active_adresses_search_result = requests.get(active_adresses_url,
                                                     params={'a': 'BTC', 'api_key': api_key, 's': '1578167920'})

        data_frame = pd.read_json(
            active_adresses_search_result.text, convert_dates=['t'])
        print('date and active adresses')
        active_adresses_time_line = data_frame['t'].tolist()
        active_adresses = data_frame['v'].tolist()

        print("everything is OK! sample result is :",
              active_adresses_time_line[0], active_adresses[0])
        if(active_adresses_search_result.status_code == 200):
            print('data collected successfully')
            active_adresses_flag = True
            break
    except requests.ConnectionError as e:
        print("OOPS!! Connection Error. Make sure you are connected to Internet. Technical Details given below.\n")
        print(str(e))

# btc price
bitcoin_price_flag = False
while bitcoin_price_flag == False:

    try:
        print('****btc price****')
        print('collecting data..')

        bitcoin_price_url = 'https://api.glassnode.com/v1/metrics/market/price_usd_close'
        bitcoin_price_request_result = requests.get(bitcoin_price_url,
                                                    params={'a': 'BTC', 'api_key': api_key, 's': '1578167920'})

        data_frame_2 = pd.read_json(
            bitcoin_price_request_result.text, convert_dates=['t'])
        print('date and bitcoin price')

        bitcoin_price_time_line = data_frame_2['t'].tolist()
        stringified_bitcoin_time_line = []
        for i in bitcoin_price_time_line:

            stringified_bitcoin_time_line.append(i.isoformat()[0:10])

        bitcoin_price = data_frame_2['v'].tolist()

        print("everything is OK! sample result is :",
              bitcoin_price_time_line[0], bitcoin_price[0])
        if(bitcoin_price_request_result.status_code == 200):
            print('data collected successfully')
            bitcoin_price_flag = True
            break

    except requests.ConnectionError as e:
        print("OOPS!! Connection Error. Make sure you are connected to Internet. Technical Details given below.\n")
        print(str(e))


# newadressees


new_adresses_flag = False
while new_adresses_flag == False:
    try:
        print('****new adresses****')
        print('collecting data..')

        new_adresses_url = 'https://api.glassnode.com/v1/metrics/addresses/new_non_zero_count'
        new_adresses_search_result = requests.get(new_adresses_url,
                                                  params={'a': 'BTC', 'api_key': api_key, 's': '1578167920'})

        data_frame_3 = pd.read_json(
            new_adresses_search_result.text, convert_dates=['t'])
        print('date and new adresses')
        new_adresses_time_line = data_frame_3['t'].tolist()
        new_adresses = data_frame_3['v'].tolist()
        print("everything is OK! sample result is :",
              new_adresses_time_line[0], new_adresses[0])
        if(new_adresses_search_result.status_code == 200):
            print('data collected successfully')
            new_adresses_flag = True
            break

    except requests.ConnectionError as e:
        print("OOPS!! Connection Error. Make sure you are connected to Internet. Technical Details given below.\n")
        print(str(e))
# btc hash rate

#  fees rate
fees_rate_flag = False
while fees_rate_flag == False:
    try:
        print('****fees rate****')
        print('collecting data..')

        fees_rate_flag_url = 'https://api.glassnode.com/v1/metrics/fees/volume_sum'
        fees_rate_search_result = requests.get(fees_rate_flag_url,
                                               params={'a': 'btc', 'api_key': api_key, 's': '1578167920'})

        data_frame_4 = pd.read_json(
            fees_rate_search_result.text, convert_dates=['t'])
        print('date and fees rates')
        fees_rate_time_line = data_frame_4['t'].tolist()
        fees_rate = data_frame_4['v'].tolist()
        fees_rate_floored = [math.floor(i) for i in fees_rate]
        print("everything is OK! sample result is :",
              fees_rate[0], fees_rate_time_line[0])
        if(fees_rate_search_result.status_code == 200):
            print('data collected successfully')
            fees_rate_flag = True
            break

    except requests.ConnectionError as e:
        print("OOPS!! Connection Error. Make sure you are connected to Internet. Technical Details given below.\n")
        print(str(e))
        continue
hash_rate_flag = False
while hash_rate_flag == False:
    try:
        print('****btc hash rate****')
        print('collecting data..')

        hash_rate_url = 'https://api.glassnode.com/v1/metrics/mining/hash_rate_mean'
        hash_rate_search_result = requests.get(hash_rate_url,
                                               params={'a': 'BTC', 'api_key': api_key, 's': '1578167920'})

        hash_rate_list = hash_rate_search_result.json()
        hash_rate_values = []
        for i in hash_rate_list:
            for v in i.values():
                hash_rate_values.append(v)

        hash_rate_without_timeline = hash_rate_values[1::2]
        print("everything is OK! sample result is :",
              hash_rate_without_timeline[0])

        if(hash_rate_search_result.status_code == 200):
            print('data collected successfully')
            hash_rate_flag = True
            break

    except requests.ConnectionError as e:
        print("OOPS!! Connection Error. Make sure you are connected to Internet. Technical Details given below.\n")
        print(str(e))

# fear and greed index
# https://api.alternative.me/fng/

fear_and_greed_flag = False
while fear_and_greed_flag == False:
    try:
        print('****Fear and greed****')
        print('collecting data..collecting data..')

        fear_and_greed_url = 'https://api.alternative.me/fng/'
        fear_and_greed_search_result = requests.get(fear_and_greed_url)

        result = fear_and_greed_search_result.json()

        print("everything is OK! ")

        if(fear_and_greed_search_result.status_code == 200):
            print('data collected successfully')
            fear_and_greed_flag = True
            break

    except requests.ConnectionError as e:
        print("OOPS!! Connection Error. Make sure you are connected to Internet. Technical Details given below.\n")
        print(str(e))


# end points with data

# btc price ticks from coingecko


@scheduler.task('interval', id='do_job_1', seconds=30, misfire_grace_time=900)
@app.route('/price_timed_module', methods=['GET'])
def job1():
    return coin_gecko_client.get_price(ids='bitcoin', vs_currencies='usd', include_market_cap=True, include_24hr_vol=True, include_24hr_change=True,)


@app.route('/fear_and_greed_index', methods=['GET'])
def fear_and_greed_index():
    return jsonify(result)


@app.route('/chart_time_line', methods=['GET'])
def chart_time_line():
    return jsonify(stringified_bitcoin_time_line)


@app.route('/btc_hash_rate', methods=['GET'])
def btc_hash_rate():
    return jsonify(hash_rate_without_timeline)


@app.route('/btc_active_adresses', methods=['GET'])
def btc_active_adresses():
    return jsonify(active_adresses)


@app.route('/btc_price', methods=['GET'])
def btc_price():
    return jsonify(bitcoin_price)


@app.route('/btc_fees_rate', methods=['GET'])
def btc_fees_rate():
    return jsonify(fees_rate_floored)


@app.route('/btc_new_adresses', methods=['GET'])
def btc_new_adresses():
    return jsonify(new_adresses)


@app.route('/jsonify_tweet_list', methods=['GET'])
def jsonify_tweet_list():
    return jsonify(tweets_list_unique_authors)


scheduler.init_app(app)
scheduler.start()

if __name__ == '__main__':
    app.run(debug=True)


# $env:FLASK_ENV = "development"
#   flask run
