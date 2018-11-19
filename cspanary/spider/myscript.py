#!/usr/bin/python

from selenium import webdriver
from selenium.webdriver.common.keys import Keys

driver = webdriver.Firefox()
driver.get("http://www.python.org")
assert "Python" in driver.title
elem = driver.find_element_by_name("q")
elem.clear()
elem.send_keys("pycon")
elem.send_keys(Keys.RETURN)

elems = driver.find_elements_by_tag_name("a")
len(elems)

for el in elems:
  print (el.get_attribute("href"))

driver.get("https://selenium-python.readthedocs.io/api.html")

assert "No results found." not in driver.page_source
driver.close()


