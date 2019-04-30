#!/usr/bin/env python3

import getopt
import json
import logging
import os
import os.path
import sys
import time
from datetime import datetime

import os
import sys

from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

mins = 0
timeout = 2


def get_firefox():

    firefox_profile = prepare_firefox_profile ()

    # Locate Firefox from the default directory otherwise use FIREFOX_BIN #
    try:
        driver = webdriver.Firefox(firefox_profile=firefox_profile)
    except Exception:
        my_local_firefox_bin = os.environ.get('FIREFOX_BIN')
        firefox_binary = FirefoxBinary(my_local_firefox_bin)
        driver = webdriver.Firefox(firefox_binary=firefox_binary)
    return driver

# def open_drivers(firefox_profile):
#     world.driver = get_firefox(firefox_profile)
#     world.driver.set_page_load_timeout(20)
#     world.driver.implicitly_wait(20)
#     world.driver.maximize_window()

def prepare_firefox_profile():
    firefox_profile = webdriver.FirefoxProfile()
    firefox_profile.set_preference("network.proxy.type", 1)
    firefox_profile.set_preference("browser.startup.homepage", "about:blank")
    firefox_profile.set_preference("startup.homepage_welcome_url", "about:blank")
    firefox_profile.set_preference("startup.homepage_welcome_url.additional", "about:blank")
    firefox_profile.set_preference("webdriver_assume_untrusted_issuer", False)
    firefox_profile.set_preference("accept_untrusted_certs", True)
    firefox_profile.update_preferences()
    return firefox_profile


def signin (driver):
    # Visit this webpage.
    driver.get("https://ppadmin-dev.patientpop.com")
    
    elem = driver.find_element_by_name("email")
    elem.send_keys("bob.marley@patientpop.com")
    elem = driver.find_element_by_name("password")
    elem.send_keys("Password1")
    elem.send_keys(Keys.RETURN)
    


def demonstrate_signin ():
    
    driver = get_firefox()
    driver.get("https://pid.aviontego.com/portals/login.aspx?CompanyID=PID")
    sys.stdin.readline()

    file = open("failed.txt","w") 
 
    for p in range (1,10):
        for i in range (1,15):
            try:
                driver.get('https://www.stoneviewnaturecenter.org/')
                time.sleep(2)
                driver.get("https://pid.aviontego.com/portals/Portals/Employee/PayHistory.aspx")    

                if p != 1:
                    time.sleep(2)
                    aaas = driver.find_elements_by_tag_name('a')
                    pas = [a for a in aaas if a.text == str(p)]
                    pa = pas[0]
                    pa.click()
                    time.sleep(2)

                # Get the link
                button = driver.find_element_by_id("ctl00_MainContent_PayHistory1_WebPanel1_GridView1_ctl{0:02}_LinkButton1".format(i))
                button.click()
                time.sleep(2)

                # Click on the view check link
                b = driver.find_element_by_id('ctl00_MainContent_PayCheckDetaill1_WebPanel1_Button2')
                b.click()
            except:
                file.write ("error: {0}, {1}\n".format(p,i))
                file.flush ()
                print ("error: {0}, {1}".format(p,i))

    driver.quit()
    
    file.close() 

        
if __name__ == "__main__":
    demonstrate_signin ()

    