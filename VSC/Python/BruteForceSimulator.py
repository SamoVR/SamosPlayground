import string
import itertools
import random
import time

limit = 4
finalcode = ""
##codecontent = string.ascii_letters + "123456789"
##codecontent = string.ascii_lowercase
codecontent = "123456789"

def GenerateCode():
    global finalcode
    finalcode = "".join(random.choices(codecontent,k=limit))
    print(finalcode)
    
def BruteForce():
    combinations = itertools.product(codecontent,repeat=limit)
    for comb in combinations:
        guess = "".join(comb)
        print(guess)
        if guess == finalcode:
            print(f"CODE CRACKED: {guess}")
            ##print(f"DEBUG: {guess} & {finalcode} & {comb}")
            break



GenerateCode()
time.sleep(5)
BruteForce()
