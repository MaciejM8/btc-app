from flask import *
from flask import Flask
# from flask_cors import CORS
from json import *
from pycoingecko import CoinGeckoAPI
from flask_apscheduler import APScheduler


import requests
import pandas as pd
import math

from werkzeug.datastructures import Headers




app = Flask(__name__)


class Config:
    SCHEDULER_API_ENABLED = True

app.config.from_object(Config())
scheduler = APScheduler()

# CORS(app)


API_KEY = '1wVcUagruE4P0O5VPrLoACLfb9e'
cg = CoinGeckoAPI()


# global timestamp
# timestamp = '1620454400'

# aktywne adresy
acAd = False
while acAd == False:
    try:
    
    
        print('****aktywne adresy****')
        print('zbieranie danych')
        
        activeAdresses = 'https://api.glassnode.com/v1/metrics/addresses/active_count'
        res = requests.get(activeAdresses,
        params={'a': 'BTC', 'api_key': API_KEY, 's':'1578167920'})

        df = pd.read_json(res.text, convert_dates=['t'])
        print('data i ilosc aktywnych adresow')
        timeactive = df['t'].tolist()
        activeAd = df['v'].tolist()
        
        print("OK! ",timeactive[0],activeAd[0])
        if(res.status_code == 200):
            print('udalo sie wydobyc dane')
            acAd = True
            break
    except requests.ConnectionError as e:
        print("OOPS!! Connection Error. Make sure you are connected to Internet. Technical Details given below.\n")
        print(str(e))
          
# btc price
btcPr = False
while btcPr == False:
    
    try:
        print('****btc price****')
        print('zbieranie danych')

        
        

        BTCprice= 'https://api.glassnode.com/v1/metrics/market/price_usd_close'
        res2 = requests.get(BTCprice,
        params={'a': 'BTC', 'api_key': API_KEY, 's':'1578167920'})

        df2 = pd.read_json(res2.text, convert_dates=['t'])
        print('data i cena btc')
        
        
        time2 = df2['t'].tolist()
        stringifiedTime2 = []
        for i in time2:
            
            stringifiedTime2.append(i.isoformat()[0:10])

        btc_price = df2['v'].tolist()
        


        print("OK! ",time2[0],btc_price[0])
        if(res2.status_code == 200):
            print('udalo sie wydobyc dane')
            btcPr = True
            break

    except requests.ConnectionError as e:
        print("OOPS!! Connection Error. Make sure you are connected to Internet. Technical Details given below.\n")
        print(str(e))
         
    
# newadressees


neAd = False
while  neAd == False:
    try:
        print('****new adresses****')
        print('zbieranie danych')

        NewAd= 'https://api.glassnode.com/v1/metrics/addresses/new_non_zero_count'
        res3 = requests.get(NewAd,
        params={'a': 'BTC', 'api_key': API_KEY, 's':'1578167920'})

        df3 = pd.read_json(res3.text, convert_dates=['t'])
        print('data i nowe adresy')
        time3 = df3['t'].tolist()
        noweAdresy = df3['v'].tolist()
        print("OK! ",time3[0],noweAdresy[0])
        if(res3.status_code == 200):
            print('udalo sie wydobyc dane')
            neAd = True
            break

    except requests.ConnectionError as e:
        print("ERROR , połączenie / odrzucenie / powiązane z jakością internetu.\n")
        print(str(e))
# btc hash rate

#  fees rate
fees = False
while  fees == False:
    try:
        print('****fees rate****')
        print('zbieranie danych')

        fees= 'https://api.glassnode.com/v1/metrics/fees/volume_sum'
        res4 = requests.get(fees,
        params={'a':'btc', 'api_key': API_KEY, 's':'1578167920'})

        df4 = pd.read_json(res4.text, convert_dates=['t'])
        print('data i nowe adresy')
        time4 = df4['t'].tolist()
        feesR = df4['v'].tolist()
        feesRateFloored = [math.floor(i) for i in feesR]
        print("OK! ", feesR[0], time4[0])
        if(res4.status_code == 200):
            print('udalo sie wydobyc dane')
            fees = True
            break

    except requests.ConnectionError as e:
        print("OOPS!! Connection Error. Make sure you are connected to Internet. Technical Details given below.\n")
        print(str(e))
        continue
hashRate = False
while  hashRate == False:
    try:
        print('****btc hash rate****')
        print('zbieranie danych')

        hashRate= 'https://api.glassnode.com/v1/metrics/mining/hash_rate_mean'
        res5 = requests.get(hashRate,
        params={'a': 'BTC', 'api_key': API_KEY, 's':'1578167920'})

        listOfDict = res5.json()
        hashrateValues=[]
        for i in listOfDict:
            for v in i.values():
                hashrateValues.append(v) 
        
        withoutTime = hashrateValues[1::2]
        print("OK! ",withoutTime[0])
        
       
        
        if(res5.status_code == 200):
            print('udalo sie wydobyc dane')
            hashRate = True
            break

    except requests.ConnectionError as e:
        print("ERROR , połączenie / odrzucenie / powiązane z jakością internetu.\n")
        print(str(e))

# fear and greed indeks
# https://api.alternative.me/fng/

fng = False
while  fng == False:
    try:
        print('****Fear and greed****')
        print('zbieranie danych')

        fng= 'https://api.alternative.me/fng/'
        resFng = requests.get(fng)

        result=resFng.json()
         
        
        
        print("OK! ")
        
       
        
        if(resFng.status_code == 200):
            print('udalo sie wydobyc dane')
            fng = True
            break

    except requests.ConnectionError as e:
        print("ERROR , połączenie / odrzucenie / powiązane z jakością internetu.\n")
        print(str(e))

#end pointy z danymi

# btc price tiker from coingecko

@scheduler.task('interval', id='do_job_1', seconds=30, misfire_grace_time=900)
@app.route('/ticker', methods = ['GET'])
def job1():
    return cg.get_price(ids='bitcoin', vs_currencies='usd',include_market_cap=True, include_24hr_vol=True, include_24hr_change=True,)
{'bitcoin': {'usd': 3462.04}}



# @app.route('/timestamp', methods = ['GET','POST'])
# def TimestampFromReact():
    
#     content = request.get_data(as_text=True)
#     global timestamp
#     timestamp = str(content)
#     print(timestamp)
#     return timestamp











@app.route('/fearandgreed', methods = ['GET'])
def FearAndGreed():
    return jsonify(result)



@app.route('/time', methods = ['GET'])
def Time():
    return jsonify(stringifiedTime2)

@app.route('/hashrate', methods = ['GET'])
def BtcHashRate():
    return jsonify(withoutTime)

@app.route('/activeAd', methods = ['GET'])
def ActiveAd():
    return jsonify(activeAd)

@app.route('/btcprice', methods = ['GET'])
def BtcPrice():
    return jsonify(btc_price)

@app.route('/feesrate', methods = ['GET'])
def BtcFeesRate():
    return jsonify(feesRateFloored)

@app.route('/new-ad', methods = ['GET'])
def newAdresses():
    return jsonify(noweAdresy)



scheduler.init_app(app)
scheduler.start()

if __name__ == '__main__':
    app.run(debug=True)




# $env:FLASK_ENV = "development"
#   flask run


# documentation Apscheduler : https://viniciuschiele.github.io/flask-apscheduler/rst/usage.html