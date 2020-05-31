import requests
import pprint
from bs4 import BeautifulSoup
import re
import json
from datetime import date

dliveStats_pre = ""	#Initializing string
URL = 'https://dlive.tv/s/stake'
page = requests.get(URL)
pp = pprint.PrettyPrinter(indent=4)
soup = BeautifulSoup(page.content, 'html.parser')					#Parsing page content
pre_data = soup.find_all('div', class_='text-24-medium line-height-24 text-white marginl-4')	#Detecting dlive stats and parsing...
## DEBUG:print(pre_data)
for line in pre_data:
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
today = date.today()
date_daily = today.strftime("%d/%m/%Y")
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

## DEBUG:pp.pprint(dliveDictionary)

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



#Use this on crontab file to automate execution process(Edit your paths): */05 00 * * * cd /home/simbad/Documents/Git_Repos/bttscan/src/components/charts && /usr/bin/python3 /home/simbad/Documents/Git_Repos/bttscan/src/components/charts/web_scrapper_test.py > /tmp/listener.log 2>&1
