ESP32 Website Controlled LED — Quick README

Overview

This sketch (`Website_controlled_LED-esp32.ino`) runs a tiny web server on an ESP32 and serves a small portfolio-themed dashboard that controls the built-in LED (GPIO 2).

Safety & Performance (recommended)

- Default polling interval from dashboard: 5 seconds. This reduces network and CPU load. Do not lower below 2s unless you understand the impact.
- Minimum blink interval enforced: 100 ms. Shorter intervals may cause high CPU usage and visible flicker.
- Default blink presets: Fast = 150 ms, Medium = 500 ms, Slow = 1000 ms.
- The sketch uses non-blocking blinking (millis-based) to keep the main loop responsive.
- Keep additional features minimal if running other tasks on the ESP32 (keep CPU usage under ~50%).

Prepare

1. Open `Website_controlled_LED-esp32.ino` in Arduino IDE.
2. Edit the `ssid` and `password` constants at the top.
3. Select the ESP32 board: Tools → Board → (e.g., ESP32 Dev Module).
4. Select the correct Port.

Upload

1. Click Verify to compile. If you see encoding errors, ensure the file is saved as UTF-8 without BOM.
2. Click Upload. Monitor the Serial console at 115200 baud.
3. After WiFi connects, the sketch prints the IP address (e.g., `http://192.168.1.100`).

Usage

- Open the printed IP in a browser on the same network.
- Use ON/OFF/Toggle, or set blink speed and Start/Stop.
- The dashboard polls `/status` every 5s and updates the status box.
- To trigger blink via HTTP: `http://<IP>/blink?action=start&speed=500` (ms).

Troubleshooting

- "Extended character" or emoji errors when compiling: remove emojis or use HTML entities in embedded HTML. The provided sketch has no emojis.
- If WiFi does not connect: double-check SSID/password and WiFi network (ESP32 requires 2.4 GHz).
- If the dashboard shows "Status unavailable": verify the ESP32 IP and that client and ESP32 are on same network and subnet.

Optional tuning (advanced)

- Increase `setInterval` polling to 10s for very constrained networks.
- Increase minimum blink to 200ms for ultra-low CPU usage.

Files

- `Website_controlled_LED-esp32.ino` — main sketch
- `workshop.html` — workshop page with embedded code pane (for documentation)

If you want, I can also:
- Add a small `upload-instructions.txt` with step-by-step screenshots (if you provide images).
- Add an alternate build folder structure for Arduino (sketch folder).