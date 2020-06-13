import requests
import pprint
from bs4 import BeautifulSoup
import re
import json
from datetime import date
import datetime
from pytz import timezone
import pytz
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

pp = pprint.PrettyPrinter(indent=4)
options = Options()
options.headless = True
options.add_argument("--window-size=1920,1200")
options.binary_location = "/usr/bin/google-chrome"
DRIVER_PATH = '/home/simbad/Documents/Git_Repos/bttscan/src/components/charts/chromedriver'
driver = webdriver.Chrome(options=options, executable_path=DRIVER_PATH)
#all_links = driver.find_elements_by_tag_name('a')
#/html/body/div/main/div/div/div/div/div/div/div[1]/div[1]/table/tbody/tr[5]/td[2]

#//*[@id="root"]/main/div/div/div/div/div/div/div[1]/div[1]/table/tbody/tr[5]/td[2]/text()[1]
#dliveStats_pre = ""	#Initializing string
driver.get('https://tronscan.org/#/data/stats/supply')

timeout = 3
try:
    element_present = EC.presence_of_element_located((By.XPATH, "//*[@id='root']/main/div/div/div/div/div/div/div[1]/div[1]/table/tbody/tr[5]/td[2]"))
    WebDriverWait(driver, timeout).until(element_present)
except TimeoutException:
    print("Timed out waiting for page to load")
finally:
    print("Page loaded")


current_TRX_burned = driver.find_element_by_xpath("//*[@id='root']/main/div/div/div/div/div/div/div[1]/div[1]/table/tbody/tr[5]/td[2]")
current_Voting_Rewards = driver.find_element_by_xpath("//*[@id='root']/main/div/div/div/div/div/div/div[1]/div[1]/table/tbody/tr[3]/td[2]")
current_Block_Rewards = driver.find_element_by_xpath("//*[@id='root']/main/div/div/div/div/div/div/div[1]/div[1]/table/tbody/tr[2]/td[2]")



current_TRX_burned = current_TRX_burned.text.strip("TRX")
current_TRX_burned = current_TRX_burned.replace(",","")

current_Voting_Rewards = current_Voting_Rewards.text.strip("TRX")
current_Voting_Rewards = current_Voting_Rewards.replace(",","")

current_Block_Rewards = current_Block_Rewards.text.strip("TRX")
current_Block_Rewards = current_Block_Rewards.replace(",","")
print("Today TRX burned: "+ current_TRX_burned)
print("Today Voting rewards: " + current_Voting_Rewards)
print("Today Block rewards: " + current_Block_Rewards)


driver.quit()


#today_utc = datetime.datetime.now(tz=utc)

tz_NY = pytz.timezone('America/New_York')
date_daily = datetime.datetime.now(tz_NY)
#print("NY:", date_daily.strftime("%d/%m/%Y, %H:%M:%S"))
date_daily = date_daily.strftime("%d/%m/%Y")
#today_est = today_utc.astimezone(eastern)
#datetime_NY = today_utc.strftime("%d/%m/%Y")
print(date_daily)
#print(today_utc)



## DEBUG:pp.pprint(dliveDictionary)

## JSON Manipulation section (dliveStats) ##
with open('trx_supply_data.json') as json_file:	#Opening table data as json file...
    data_array = []
    data = json.load(json_file)				#Assigning json into a variable
    burn_data_lenght = len(data["datasets"][0]["data"])
    #data_lenght = len(data_array)
    #print("Fee burned data length: " + str(burn_data_lenght))
    ystdy_fee_brnd = str(data["datasets"][0]["data"][burn_data_lenght-1])  #Getting last record of fee burned TRX data
    print("Fee burned TRX from yesterday: " + ystdy_fee_brnd)


    vote_data_lenght = len(data["datasets"][1]["data"])
    #data_lenght = len(data_array)
    #print("Vote rewards data length: " + str(vote_data_lenght))
    ystdy_vote_rwrds = str(data["datasets"][1]["data"][vote_data_lenght-1])  #Getting last record of fee burned TRX data
    print("Vote rewards from yesterday: " + ystdy_vote_rwrds)

    block_data_lenght = len(data["datasets"][2]["data"])
    #data_lenght = len(data_array)
    #print("Vote rewards data length: " + str(vote_data_lenght))
    ystdy_block_rwrds = str(data["datasets"][2]["data"][block_data_lenght-1])  #Getting last record of fee burned TRX data
    print("Block rewards from yesterday: " + ystdy_block_rwrds)


data["labels"].append(date_daily)   #Appending current date
data["datasets"][0]["data"].append(round(float(current_TRX_burned)))  #Appending today's fee brned TRX
data["datasets"][1]["data"].append(int(current_Voting_Rewards))  #Appending today's vote rewards TRX
data["datasets"][2]["data"].append(int(current_Block_Rewards))  #Appending today's block rewards TRX


pp.pprint(data)
"""
with open('dliveStats.json', 'w') as outfile:	#Save dictionary to json file
	json.dump(data_table, outfile, indent=4)

## JSON Manipulation section (lineChart) ##
with open('lineChart.json') as json_file:	#Opening charts data as json file...
	data_lineChart = json.load(json_file)   #Assigning json into a variable
	data_lineChart["labels"].append(dliveStats_daily[0])	#Appending today's date in labels key in dictionary
	## DEBUG: pp.pprint(data_lineChart["labels"])
	data_lineChart["datasets"][0]["data"].append(dliveStats_daily[1])	#Appending today's ATR
	## DEBUG: pp.pprint(data_lineChart["datasets"][0]["data"])
	data_lineChart["datasets"][1]["data"].append(dliveStats_daily[3])	#Appending today's total distribution
	## DEBUG: pp.pprint(data_lineChart["datasets"][1]["data"])
	data_lineChart["datasets"][2]["data"].append(dliveStats_daily[4])	#Appending today's staked BTT
	## DEBUG: pp.pprint(data_lineChart["datasets"][2]["data"])

with open('lineChart.json', 'w') as outfile:	#Save dictionary to json file
	json.dump(data_lineChart, outfile, indent=4)

"""
#Use this on crontab file to automate execution process(Edit your paths): */05 00 * * * cd /home/simbad/Documents/Git_Repos/bttscan/src/components/charts && /usr/bin/python3 /home/simbad/Documents/Git_Repos/bttscan/src/components/charts/web_scrapper_test.py > /tmp/listener.log 2>&1
