#IMPORT THESE PACKAGES
import selenium
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import time
import urllib.request

# options = Options()
# options.add_argument("start-maximized")
ser = Service("C:\Program Files (x86)\chromedriver.exe")
driver = webdriver.Chrome(service= ser)


# get post data
driver.get("https://www.tiktok.com/@larrygao/video/7072540447532387626?is_copy_url=1&is_from_webapp=v1")

# extract information from individual post
timePosted = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div[1]/div[1]/div/div[1]/div[1]/a[2]').text
tags = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div[1]/div[1]/div/div[1]/div[2]').text
video = driver.find_element(By.XPATH, '//*[@id="xgwrapper-0-7072540447532387626"]/video')
## get video src request

############### To-Do video is encrypted with blob, need to find a way to extract
# video_url = video.get_property('src')
# urllib.request.urlretrieve(video_url, 'videoname.mp4')


splittedText=tags.split("#")

for i in range(1,len(splittedText)):
    print(splittedText[i],"indivTags")
print(timePosted.split("·")[1],"timeposted")   
