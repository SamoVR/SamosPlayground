import random
import subprocess
import tkinter
import tkinter.messagebox


#letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"
letters = "cBwStN2j48VZ9RyLgqU7mGnhlK0IY6pXxJvFoaO3sT1iHrCdeAukDWQzPfEb5M4yaj2Bz"

max_letters = 100
min_letters = 50

class StartProgram:
    def Start():

        def GeneratePassword() :
            finalpassword = ""
            for x in letters :
                chance = random.randint(1,2)
            if chance == 1 :
                finalpassword += x
            if len(finalpassword) > max_letters :
                finalpassword = finalpassword[:max_letters]
            if len(finalpassword) < min_letters :
                finalpassword += "".join(random.choices(letters, k=min_letters - len(finalpassword)))
            return finalpassword    

        def CopyText(text) :
            subprocess.run("clip",text=True,input=text)

        
        password = GeneratePassword()
        print(password)
        CopyText(password)
        message = tkinter.messagebox.askyesno("Generated Password",password + " \n\nDo you wish to generate a new password? \n(New password was automatically copied to your clipboard.)")
        #subprocess.run("clip",text=True,input=password)

        if message == True :
            StartProgram.Start()

StartProgram.Start()