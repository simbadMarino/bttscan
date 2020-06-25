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
    tz_NY = pytz.timezone('America/New_York')
    date_daily = datetime.datetime.now(tz_NY)
    date_daily = date_daily.strftime("%d/%m/%Y")
    print(date_daily)

    ## JSON Manipulation section (trxsupply json) ##
    with open('trx_supply_data.json') as json_file:	#Opening table data as json file...
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

        feeBurnedDelta = round(float(current_TRX_burned)) - round(float(ystdy_fee_brnd))
        votingRewardsDelta = int(current_Voting_Rewards) - int(ystdy_vote_rwrds)
        blockRewardsDelta = int(current_Block_Rewards) - int(ystdy_block_rwrds)

        print("Delta Fee burned: " + str(feeBurnedDelta))
        print("Delta Voting rewards : " + str(votingRewardsDelta))
        print("Delta Block rewards: " + str(blockRewardsDelta))


        data["labels"].append(date_daily)   #Appending current date
        data["datasets"][0]["data"].append(round(float(current_TRX_burned)))  #Appending today's fee brned TRX
        data["datasets"][1]["data"].append(int(current_Voting_Rewards))  #Appending today's vote rewards TRX
        data["datasets"][2]["data"].append(int(current_Block_Rewards))  #Appending today's block rewards TRX
        #pp.pprint(data)
    with open('trx_supply_data.json', 'w') as outfile:	#Save dictionary to json file
    	json.dump(data, outfile, indent=4)


    with open('lineTronStats.json') as json_file:	#Opening lineTronStats as json file...
        data = json.load(json_file)				#Assigning json into a variable

        data["labels"].append(date_daily)   #Appending current date
        data["datasets"][0]["data"].append(feeBurnedDelta)
        data["datasets"][1]["data"].append(votingRewardsDelta)
        data["datasets"][2]["data"].append(blockRewardsDelta)
        #pp.pprint(data)
    with open('lineTronStats.json', 'w') as outfile:	#Save dictionary to json file
    	json.dump(data, outfile, indent=4)
