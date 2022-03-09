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




ser = Service("C:\Program Files (x86)\chromedriver.exe")
option = webdriver.ChromeOptions()
option.add_argument("--profile-directory=Default")
# option.add_argument("--user-data-dir=C:\Program Files\Google\Chrom\User Data")
option.add_argument('--disable-blink-features=AutomationControlled')
option.add_argument("window-size=1920,1000")
option.add_experimental_option("excludeSwitches", ["enable-automation"])

driver = webdriver.Chrome(service= ser, options = option)

print("middle start  browser")

driver.get("https://www.tiktok.com/login/phone-or-email/email")
time.sleep(1)
    


# # input login details
loginUsername = driver.find_element(By.XPATH, '//*[@id="root"]/div/div[1]/form/div[2]/div/input')
loginUsername.clear()
loginUsername.send_keys("realworkingjo@gmail.com")
loginPassword = driver.find_element(By.XPATH, '//*[@id="root"]/div/div[1]/form/div[3]/div/input')
loginPassword.clear()
loginPassword.send_keys("qWer1@34")
driver.implicitly_wait(3) # seconds
driver.find_element(By.XPATH, '//*[@id="root"]/div/div[1]/form/button').click()



time.sleep(100)