import math
import random
import time

def Count(t,a):
    x = 0
    ogt = t
    number = t
    while t:
        time.sleep(a)
        number -= a
        number = round(number,2)
        print(number)
        x += a
        #if x >= ogt:
        if number <= 0:
            break


Count(10,0.1)





