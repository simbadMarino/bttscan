import requests
#import pprint
from bs4 import BeautifulSoup
import re
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
	#print(line.contents)
	#print("Line")
dliveStats_daily = dliveStats_pre.split(',')
dliveStats_daily.pop(0)
dliveStats_daily.pop(3)
dliveStats_daily[0] = float(dliveStats_daily[0])*1000000000
dliveStats_daily[1] = float(dliveStats_daily[1])*1000000
dliveStats_daily[2] = float(dliveStats_daily[2])
print(dliveStats_daily)


#pp_pre_data = pp.pprint(pre_data)

#print(pp_pre_data)
