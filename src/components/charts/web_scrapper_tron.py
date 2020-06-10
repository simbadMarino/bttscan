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




print("TRX burned: "+ current_TRX_burned.text)
print("Voting rewards: " + current_Voting_Rewards.text)
print("Block rewards: " + current_Block_Rewards.text)
driver.quit()
#page = driver.page_source
#pp = pprint.PrettyPrinter(indent=4)
#soup = BeautifulSoup(page)					#Parsing page content
#print(soup)
#pre_data = soup.find_all('table',class_ ='table')	#Detecting tron stats and parsing...
#print(pre_data)
"""for line in pre_data:
	dliveStats_pre = dliveStats_pre + str(line.contents).strip("[]'\\n %MB+")
	dliveStats_pre = dliveStats_pre + ','
	## DEBUG:print(line.contents)
## DEBUG:print("Line")
dliveStats_daily = dliveStats_pre.split(',')						#Converting to array by adding ',' instead of NewLine(\n)
## DEBUG: print(dliveStats_daily)
dliveStats_daily.pop(0)												#Remove personal staking BTT
dliveStats_daily.pop(3)												#Removing empty value
dliveStats_daily[0] = float(dliveStats_daily[0])*1000000000			#Adding some 0's, meaning Billion //# TODO: Detect the letter B or M of billions/millions
dliveStats_daily[0] = int(dliveStats_daily[0])	#Total Staked BTT
dliveStats_daily[1] = float(dliveStats_daily[1])*1000000			#Adding some 0's, meaning Billion //# TODO: Detect the letter B or M of billions/millions
dliveStats_daily[1] = int(dliveStats_daily[1])	#Distributed BTT
dliveStats_daily[2] = float(dliveStats_daily[2]) #APR
#today_utc = datetime.datetime.now(tz=utc)

tz_NY = pytz.timezone('America/New_York')
date_daily = datetime.datetime.now(tz_NY)
#print("NY:", date_daily.strftime("%d/%m/%Y, %H:%M:%S"))
date_daily = date_daily.strftime("%d/%m/%Y")
#today_est = today_utc.astimezone(eastern)
#datetime_NY = today_utc.strftime("%d/%m/%Y")
#print(date_daily)
#print(today_utc)
daily_return = round(dliveStats_daily[2] / 365,3)
## DEBUG:print(date_daily)
dliveStats_daily.append(date_daily)
dliveStats_daily.reverse()
dliveStats_daily.insert(2,daily_return)
## DEBUG:print(dliveStats_daily)

dliveDictionary =	{					#Converting dlive data into a dictionary (to be later added to our json file)
  "date": dliveStats_daily[0],
  "ar": dliveStats_daily[1],
  "dailyreturn": dliveStats_daily[2],
  "totaldist": dliveStats_daily[3],
  "totalstaked": dliveStats_daily[4]
}
"""
## DEBUG:pp.pprint(dliveDictionary)
"""
## JSON Manipulation section (dliveStats) ##
with open('dliveStats.json') as json_file:	#Opening table data as json file...
	data_table = json.load(json_file)				#Assigning json into a variable
	## DEBUG:pp.pprint(data["dliveStats"][1])

data_table["dliveStats"].append(dliveDictionary)  #Appending our new dictionary into our json (array of dictionaries)
pp.pprint(data_table)
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
