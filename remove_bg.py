import os
import sys
from rembg import remove
from PIL import Image

def process_image(input_path, output_path):
    print(f"Processing image {input_path}...")
    input_image = Image.open(input_path)
    output_image = remove(input_image)
    output_image.save(output_path, "PNG")
    print(f"Saved transparent image to {output_path}")

if __name__ == "__main__":
    if len(sys.argv) == 3:
        process_image(sys.argv[1], sys.argv[2])
    else:
        print("Usage: python remove_bg.py <input> <output>")
