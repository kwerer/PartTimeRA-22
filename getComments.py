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
from csv import DictReader




ser = Service("C:\Program Files (x86)\chromedriver.exe")
option = webdriver.ChromeOptions()
driver = webdriver.Chrome(service= ser, options = option)


# log in with cookie
driver.get("https://www.tiktok.com/@wze_animeedits/video/7066688221220015362?is_copy_url=1&is_from_webapp=v1")
def get_cookies_values(file):
    with open(file, encoding="utf-8-sig") as f:
        dict_reader = DictReader(f)
        list_of_dicts = list(dict_reader)
    print(list_of_dicts,"list of dicts")
    return list_of_dicts

cookies = get_cookies_values("indivPostCookies.csv")
print(cookies, "cookies")
for i in cookies:
    print(i,"this is i")
    driver.add_cookie(i)

driver.refresh()


driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div[1]/div[1]/div/div[2]/div[2]/button[2]').click()
driver.implicitly_wait(10)
for i in range(1,10):
    indivComment = driver.find_element(By.XPATH, f'//*[@id="app"]/div[2]/div[3]/div[2]/div[3]/div[{i}]/div[1]/div[1]/p[1]').text
    print(indivComment)
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