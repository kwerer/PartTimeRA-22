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
import json

# options = Options()
# options.add_argument("start-maximized")
ser = Service("C:\Program Files (x86)\chromedriver.exe")
driver = webdriver.Chrome(service= ser)

print("middle start  browser")
# driver.get("https://www.tiktok.com/login/phone-or-email/email")
driver.get("https://www.tiktok.com/")

FypList = []

# extract information from for you page
for i in range(1,10):
    time.sleep(1)
    numLikes = driver.find_element(By.XPATH, f"//*[@id=\"app\"]/div[2]/div[2]/div[1]/div[{i}]/div/div[2]/div[2]/button[1]/strong").text
    numComments = driver.find_element(By.XPATH, f"//*[@id=\"app\"]/div[2]/div[2]/div[1]/div[{i}]/div/div[2]/div[2]/button[2]/strong").text
    numShares = driver.find_element(By.XPATH, f"//*[@id=\"app\"]/div[2]/div[2]/div[1]/div[{i}]/div/div[2]/div[2]/button[3]/strong").text
    userId = driver.find_element(By.XPATH, f"//*[@id=\"app\"]/div[2]/div[2]/div[1]/div[{i}]/div/div[1]/div[1]/a[2]/h3").text

    FypList.append({"post": i, "numLikes": numLikes, "numComments":numComments,"numShares":numShares, "userId": userId})
    print(numLikes, "numLikes")
    print(numComments, "numComments")
    print(numShares, "nunmShares")
    print(userId, "userId")
    
    
print(FypList,"finalList")

# # input login details
# loginUsername = driver.find_element(By.XPATH, '//*[@id="root"]/div/div[1]/form/div[2]/div/input')
# loginUsername.clear()
# loginUsername.send_keys("realworkingjo@gmail.com")
# loginPassword = driver.find_element(By.XPATH, '//*[@id="root"]/div/div[1]/form/div[3]/div/input')
# loginPassword.clear()
# loginPassword.send_keys("qWer1@34")
# driver.implicitly_wait(3) # seconds
# driver.find_element(By.XPATH, '//*[@id="root"]/div/div[1]/form/button').click()
time.sleep(100)


# element = driver.find_element(By.XPATH, '//*[@id="root"]/div/div[1]/div/div[1]/div[2]/div[2]')
# driver.find_element(By.XPATH, '//*[@id="root"]/div/div[1]/div/div[1]/div[2]/div[2]').click()
# TEXT = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div/div[1]/h2[2]').text

# print(TEXT)