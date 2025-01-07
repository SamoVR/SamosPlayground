import random
import tkinter
import tkinter.messagebox

message = tkinter.messagebox.askyesnocancel("Rock Paper Scissors | Made By Samo_VR","Do you wish to start the game?")

class Main :
    def StartGame() :

        def GetSymbol() :
            ran = random.randint(1,3)
            if ran == 1 :
                return "Rock"
            if ran == 2 :
                return "Paper"
            if ran == 3 :
                return "Scissors"

        if message :
            retrymessage = tkinter.messagebox.askretrycancel("Rock Paper Scissors | Made By Samo_VR",GetSymbol())
            if retrymessage :
                Main.StartGame()



Main.StartGame()
