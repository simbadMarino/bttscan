import requests
import pprint
from bs4 import BeautifulSoup
import re
import json
from datetime import date

dliveStats_pre = ""
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

with open('dliveStats.json') as json_file:	#Opening charts data as json file...
	data = json.load(json_file)				#Assigning json into a variable
	## DEBUG:pp.pprint(data["dliveStats"][1])

data["dliveStats"].append(dliveDictionary)  #Appending our new dictionary into our json (array of dictionaries)
pp.pprint(data)
with open('dliveStats.json', 'w') as outfile:
	json.dump(data, outfile, indent=4)

#pp_pre_data = pp.pprint(pre_data)

#print(pp_pre_data)
