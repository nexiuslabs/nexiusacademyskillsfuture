from PIL import Image
import sys

# Process the second image (light blue bg with TP logo + CREATING TOMORROW)
img_path = "/root/.hermes/profiles/dev-ops/image_cache/img_02e37ee30ec7.jpg"
output_path = "/root/nexius-sites/nexiusacademy-logo-update-clean/public/images/partners/temasek-poly-logo-transparent.png"

img = Image.open(img_path).convert("RGBA")
pixels = img.load()

# The background is light blue/cyan. Sample the top-left corner color.
bg_color = pixels[0, 0]
print(f"Detected background color: {bg_color[:3]}")

# Threshold for color key - make similar colors transparent
threshold = 60
width, height = img.size

for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        # Check if pixel is close to the background color
        dr = abs(r - bg_color[0])
        dg = abs(g - bg_color[1])
        db = abs(b - bg_color[2])
        if dr < threshold and dg < threshold and db < threshold:
            pixels[x, y] = (r, g, b, 0)

# Also check for white/light pixels near edges that may be part of bg
# White pixels (RGB all > 220) with no neighboring colored pixels

img.save(output_path, "PNG")
print(f"Saved transparent logo to {output_path}")
print(f"Size: {img.size}")
