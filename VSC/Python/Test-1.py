import math
import random
import time

var = "test"

def floor(int):
    newnum = round(int)
    print("Rounded Number:",newnum)

while var :
    time.sleep(0.25)
    randint = random.uniform(0,999999999)
    print("Raw Number:",randint)
    floor(randint)
    time.sleep(0.25)
