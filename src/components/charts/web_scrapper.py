import requests
#import pprint
from bs4 import BeautifulSoup
import re
import json
from datetime import date

dliveStats_pre = ""
URL = 'https://dlive.tv/s/stake'
page = requests.get(URL)
#pp = pprint.PrettyPrinter(indent=4)
soup = BeautifulSoup(page.content, 'html.parser')
pre_data = soup.find_all('div', class_='text-24-medium line-height-24 text-white marginl-4')
#print(pre_data)
for line in pre_data:
	dliveStats_pre = dliveStats_pre + str(line.contents).strip("[]'\\n %MB+")
	dliveStats_pre = dliveStats_pre + ','
#	print(line.contents)
	#print("Line")
dliveStats_daily = dliveStats_pre.split(',')
dliveStats_daily.pop(0)
dliveStats_daily.pop(3)
dliveStats_daily[0] = float(dliveStats_daily[0])*1000000000
dliveStats_daily[0] = int(dliveStats_daily[0])
dliveStats_daily[1] = float(dliveStats_daily[1])*1000000
dliveStats_daily[1] = int(dliveStats_daily[1])
dliveStats_daily[2] = float(dliveStats_daily[2])
today = date.today()
date_daily = today.strftime("%d/%m/%Y")
daily_return = round(dliveStats_daily[2] / 365,3)
#print(date_daily)
dliveStats_daily.append(date_daily)
dliveStats_daily.reverse()
dliveStats_daily.insert(2,daily_return)
print(dliveStats_daily)

with open('dliveStats.json') as json_file:
	data = json.load(json_file)
	#print(data)
	lines = 0
	for i in data:
		lines = lines + 1
#	print("Number of lines: ",lines)
	#
	#print(data['1'][0])
data[str(lines+1)] = dliveStats_daily
#print(data)
with open('dliveStats.json', 'w') as outfile:
	json.dump(data, outfile, indent=4)

pp_pre_data = pp.pprint(pre_data)

#print(pp_pre_data)
