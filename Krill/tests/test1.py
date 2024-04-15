from selenium import webdriver
from selenium.webdriver.common.actions.action_builder import ActionBuilder
from selenium.webdriver.common.actions.mouse_button import MouseButton
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import logging

logger = logging.getLogger('selenium')


def test_title_start_button():
    print("testing game title screen start button") #
    browser = webdriver.Chrome() 
    #browser.get("https://strikor.github.io/Codename-Game/Krill/game.html")
    browser.get("http://127.0.0.1:3000/Krill/game.html")
    
#    width = browser.get_window_size().get("width")
 #   height = browser.get_window_size().get("height")
  #  assert width > 100  
   # assert height > 100

    time.sleep(3)

#    buttonWidth = 200
 #   buttonHeight = 50
  #  buttonX = width / 2 #- buttonWidth / 2
   # buttonY = height / 2 #- buttonHeight / 2

    #logger.debug("button coord: ", buttonX, ", ", buttonY)
    #logger.debug("window width, height: ", width, ", ", height)

    #actions = ActionChains(browser)

    # Move to specific coordinates (x, y) relative to the current position
    #actions.move_by_offset(buttonX, buttonY)

    # Perform a click
    #actions.click()

    # Execute the actions
    #actions.perform()
    
    #actions = ActionBuilder(browser)
    #actions.pointer_action.move_to_location(buttonX, buttonY)
    #actions.perform()

    #actions.click()
    #actions.perform()
    assert "start_button" in browser.page_source
    startButton = browser.find_element(By.ID, "start_button")
    ActionChains(browser)\
        .click(startButton)\
        .perform()
    
    ## move RIGHT for 2.6 seconds (going toward room)
    ActionChains(browser).key_down(Keys.ARROW_RIGHT).perform()
    time.sleep(2.6)
    ActionChains(browser).key_up(Keys.ARROW_RIGHT).perform()
    
    ## move DOWN for 5 seconds (toward room, collision with wall)
    ActionChains(browser).key_down(Keys.ARROW_DOWN).perform()
    time.sleep(4)
    ActionChains(browser).key_up(Keys.ARROW_DOWN).perform()
    #time.sleep(3)

    ## wall collision to the LEFT
    ActionChains(browser).key_down(Keys.ARROW_LEFT).perform()
    time.sleep(1.25)
    ActionChains(browser).key_up(Keys.ARROW_LEFT).perform()

    ## right to leave room check "d" (WASD)
    ActionChains(browser).key_down("d").perform()
    time.sleep(0.5)
    ActionChains(browser).key_up("d").perform()

    ## UP toward door 
    ActionChains(browser).key_down(Keys.ARROW_UP).perform()
    time.sleep(3.25)
    ActionChains(browser).key_up(Keys.ARROW_UP).perform()

    ## to and through door (RIGHT, "e")
    ActionChains(browser).key_down(Keys.ARROW_RIGHT).perform()
    time.sleep(1)
    ActionChains(browser).send_keys("e").perform()
    time.sleep(2)
    ActionChains(browser).key_up(Keys.ARROW_RIGHT).perform()

    ## close door ("e") check "s" (WASD)
    ActionChains(browser).send_keys("e").perform()
    ActionChains(browser).send_keys("s").perform()
    time.sleep(1)

    ## go DOWN in room
    ActionChains(browser).key_down(Keys.ARROW_DOWN).perform()
    time.sleep(2.5)
    ActionChains(browser).key_up(Keys.ARROW_DOWN).perform()

    ## check "a" (WASD) left
    ActionChains(browser).send_keys("a").perform()
    time.sleep(1)

    ## check "w" (WASD) up
    ActionChains(browser).key_down("w").perform()
    time.sleep(2.2)
    ActionChains(browser).key_up("w").perform()
    time.sleep(1)

    ## check time travel present to future
    ActionChains(browser).send_keys("t").perform()
    time.sleep(2)

    ## check time travel future to present
    ActionChains(browser).send_keys("t").perform()  

    ## hang out for 5 sec
    time.sleep(5)

    browser.close()

#def test_wiki_CPP():
#    print("testing wikipedia results to see if Bjarne is mentioned in C++ results") 
#    browser = webdriver.Chrome() # can be called browser or driver
#    browser.get("http://www.wikipedia.org")
#    query = "C++"
 #   search_input = browser.find_element(By.ID, "searchInput")
  #  search_input.clear()
   # search_input.send_keys(query)
    #search_input.send_keys(Keys.RETURN)
    #assert "Bjarne Stroustrup" in browser.page_source #G

#    time.sleep(3)
 #   browser.close()


if __name__ == "__main__":
    test_title_start_button()
    #test_wiki_CPP()
    print("done.")
