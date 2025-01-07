import itertools
import string
import os

# Define the letters you want to use
letters = string.ascii_lowercase  # This will give you 'abcdefghijklmnopqrstuvwxyz'

# Generate all combinations of 4 letters
combinations = itertools.product(letters, repeat=4)

# Define the directory and file name
output_directory = 'combinations'
output_file = 'combinations.txt'

# Create the directory if it doesn't exist
os.makedirs(output_directory, exist_ok=True)

# Define the full path to the output file
output_path = os.path.join(output_directory, output_file)

# Open the file in write mode
with open(output_path, 'w') as f:
    for combo in combinations:
        # Write each combination to the file without the line number
        f.write(f"{''.join(combo)}\n")

print(f"All combinations have been saved to {output_path}")
