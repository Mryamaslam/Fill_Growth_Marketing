from PIL import Image
from collections import deque
import sys

path = r"C:\Users\Administrator\FILL_GROWTH_MARKETING\public\logo.png"

img = Image.open(path).convert("RGBA")
w, h = img.size
px = img.load()

def is_white(p, thr=235):
    r, g, b, a = p
    return a > 0 and r >= thr and g >= thr and b >= thr

# Flood fill from the four corners to clear only the exterior white background.
visited = [[False] * w for _ in range(h)]
q = deque()
for sx, sy in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
    if is_white(px[sx, sy]) and not visited[sy][sx]:
        visited[sy][sx] = True
        q.append((sx, sy))

cleared = 0
while q:
    x, y = q.popleft()
    px[x, y] = (255, 255, 255, 0)
    cleared += 1
    for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        nx, ny = x + dx, y + dy
        if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx] and is_white(px[nx, ny]):
            visited[ny][nx] = True
            q.append((nx, ny))

img.save(path)
print(f"Done. Size={w}x{h}, cleared {cleared} background pixels.")
