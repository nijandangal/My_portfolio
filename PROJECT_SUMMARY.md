# Project 1: Website Controlled LED Light using ESP32
## Complete Implementation Summary

---

## 📋 Project Overview

This is a **complete, production-ready solution** for controlling LED lights on an ESP32 microcontroller from multiple interfaces:
- **Physical Interface**: Boot button (GPIO 0) on the ESP32 itself
- **Web Dashboard**: Built-in web interface at ESP32's IP address
- **Website Integration**: Control from nijandangal.com.np using JavaScript code

### Key Features ✨
✅ **Copy & Paste Ready** - No code modifications needed (except WiFi credentials)
✅ **Default Pins** - Uses GPIO 2 (built-in LED) and GPIO 0 (boot button) already present on ESP32
✅ **No External Components Needed** - Works with just ESP32 + USB cable for testing
✅ **Multi-Control Interfaces** - Physical button, web dashboard, and website widget
✅ **CORS Enabled** - Safe cross-origin requests for website integration
✅ **Real-time Status** - Live LED state, WiFi signal strength, device info
✅ **Mobile Friendly** - Responsive design works on all devices

---

## 🔧 Hardware Configuration

### Default Pin Assignments (NO SOLDERING NEEDED)

| Component | GPIO Pin | Hardware | Function | Notes |
|-----------|----------|----------|----------|-------|
| **Built-in LED** | GPIO 2 | ESP32 Dev Kit C / Wemos D1 | Digital Output | Blue LED, very dim (check in dark room) |
| **Boot Button** | GPIO 0 | Embedded Button | Digital Input | Toggles built-in LED manually |
| **External LED** | GPIO 4 | Optional External | Digital Output | For additional control (with 220Ω resistor) |
| **Ground** | GND | Common | Reference | All devices share same ground |

### Supported ESP32 Models
- ✅ ESP32 Dev Kit C/V4 (Official Espressif)
- ✅ Wemos D1 R32
- ✅ ESP32-WROVER
- ✅ Any ESP32 with GPIO 2 and GPIO 0

### Optional External LED Wiring
```
ESP32 GPIO 4 → 220Ω Resistor → LED Positive (Long Leg)
LED Negative (Short Leg) → GND (Common Ground)
```

---

## 💻 Software Components

### 1. ESP32 Arduino Firmware
**Location**: Workshop Page → ESP32 Firmware Code Section

**Features**:
- WiFi connectivity (2.4GHz only)
- Built-in web server on port 80
- REST API endpoints for LED control
- JSON response format
- Real-time status updates
- CORS headers for website integration
- Button interrupt handler for manual control
- Auto status reporting to Serial Monitor

**ESP32 Endpoints Available**:
```
GET /                         → HTML Dashboard
GET /led/builtin/on          → Turn built-in LED ON
GET /led/builtin/off         → Turn built-in LED OFF
GET /led/builtin/toggle      → Toggle built-in LED
GET /led/external/on         → Turn external LED ON
GET /led/external/off        → Turn external LED OFF
GET /led/external/toggle     → Toggle external LED
GET /status                  → Get JSON status (builtin_led, external_led, rssi, ip, device)
GET /device/info             → Get device information (device_id, pins, version, MAC address)
```

**Usage Example**:
```
http://192.168.1.100/led/builtin/on     (turn on)
http://192.168.1.100/led/builtin/off    (turn off)
http://192.168.1.100/status             (check status)
```

### 2. Website Integration JavaScript
**Location**: Workshop Page → Website Integration Code Section

**Features**:
- ES6 Class-based design
- Automatic device detection
- Status polling with customizable intervals
- Event-driven architecture
- Error handling and logging
- Promise-based async/await

**Usage Example**:
```javascript
// Initialize controller
const esp32 = new ESP32Controller('192.168.1.100', 'My ESP32');

// Control LED
await esp32.builtinLedOn();
await esp32.builtinLedOff();
await esp32.builtinLedToggle();

// Get status
const status = await esp32.getStatus();
console.log(status.builtin_led); // 1 or 0

// Auto-update status every 2 seconds
esp32.startAutoUpdate(2);

// Listen for status updates
window.addEventListener('esp32StatusUpdate', (e) => {
  console.log(e.detail.status);
});
```

### 3. HTML Widget for Website
**Location**: Workshop Page → Website Integration Code Section

Drop-in widget for nijandangal.com.np with:
- IP address input field
- Connection status indicator
- Built-in LED controls (ON/OFF/Toggle)
- External LED controls (ON/OFF/Toggle)
- Real-time status display
- Responsive design for mobile/desktop

---

## 📖 Installation Guide (Step-by-Step)

### Phase 1: Setup Development Environment (15 minutes)

1. **Install Arduino IDE 2.0+**
   - Download from: https://www.arduino.cc/en/software
   - Install for your operating system (Windows/Mac/Linux)

2. **Add ESP32 Board Support**
   - Open Arduino IDE
   - Go to File → Preferences
   - In "Additional boards Manager URLs" paste:
     ```
     https://dl.espressif.com/dl/package_esp32_index.json
     ```
   - Click OK
   - Go to Tools → Board → Boards Manager
   - Search for "ESP32"
   - Install "esp32 by Espressif Systems" (latest version)

3. **Install Required Libraries**
   - Go to Sketch → Include Library → Manage Libraries
   - Search for "ArduinoJson"
   - Install version 6.x by Benoit Blanchon
   - Click Install

### Phase 2: Prepare Code (5 minutes)

1. **Copy ESP32 Firmware Code**
   - Go to Workshop Page → ESP32 Firmware Code Section
   - Click on "ESP32 Main Code" tab
   - Copy the entire code block
   - Create new sketch in Arduino IDE (Ctrl+N)
   - Paste the code

2. **Configure WiFi**
   - Find these lines at the top:
     ```cpp
     const char* ssid = "YOUR_SSID";
     const char* password = "YOUR_PASSWORD";
     ```
   - Replace YOUR_SSID with your WiFi network name
   - Replace YOUR_PASSWORD with your WiFi password
   - Save the sketch (Ctrl+S)

### Phase 3: Flash ESP32 (10 minutes)

1. **Connect Hardware**
   - Connect ESP32 to computer with USB cable
   - Wait for drivers to load (5 seconds)

2. **Configure Arduino IDE**
   - Go to Tools → Board
   - Select "ESP32 Dev Module"
   - Go to Tools → Port
   - Select the COM port (e.g., COM3, COM5)
   - For board speed, keep default 115200 baud

3. **Upload Code**
   - Click Upload button (→ icon) in toolbar
   - Wait 5-10 seconds for compilation and upload
   - When complete, you'll see "Leaving... Hard resetting via RTS pin"

### Phase 4: Verify Installation (5 minutes)

1. **Check Serial Monitor**
   - Go to Tools → Serial Monitor
   - Set baud rate to 115200 (important!)
   - You should see:
     ```
     ╔════════════════════════════════════════╗
     ║  ESP32 WiFi LED Control System v1.0   ║
     ║  Using default pins (GPIO 2 & 0)      ║
     ╚════════════════════════════════════════╝
     
     📍 Pins Initialized:
        Built-in LED: GPIO 2
        Boot Button: GPIO 0
        External LED: GPIO 4
     
     🔗 Connecting to WiFi: YourWiFiName
     .....
     ✓ WiFi Connected!
     📡 IP Address: 192.168.X.X
     🌐 Access at: http://192.168.X.X
     ```

2. **Copy the IP Address**
   - Note down the IP address shown (e.g., 192.168.1.100)
   - This is unique to your ESP32 on your network

3. **Test Built-in LED**
   - Open web browser
   - Type the IP address (e.g., http://192.168.1.100)
   - You should see the LED control dashboard
   - Click "Turn ON" button
   - The blue LED on ESP32 should light up (may be dim)

4. **Test Boot Button**
   - Press and hold the BOOT button on ESP32
   - Serial Monitor should show: "🔘 Button pressed! Built-in LED: ON/OFF"
   - The LED state should toggle

---

## 🌐 Website Integration

### Add to nijandangal.com.np

1. **Add JavaScript Code**
   - Locate: Workshop Page → Website Integration Code → Website JavaScript Code tab
   - Copy the entire ESP32Controller class code
   - Add to your website's <script> section or save as `esp32-controller.js`

2. **Add HTML Widget**
   - Locate: Workshop Page → Website Integration Code → Website HTML Elements tab
   - Copy the HTML code
   - Add to your webpage where you want the control panel to appear

3. **Test Connection**
   - Get ESP32's IP address from Serial Monitor
   - Open the website page with the widget
   - Enter the IP address in the input field
   - Click "Connect" button
   - Status indicator should turn green
   - Now use buttons to control the LED

### Website JavaScript API Usage

```javascript
// Create instance
const device = new ESP32Controller('192.168.1.100', 'Workshop LED');

// Control methods
device.builtinLedOn();        // Turn ON
device.builtinLedOff();       // Turn OFF
device.builtinLedToggle();    // Toggle
device.externalLedOn();       // External ON
device.externalLedOff();      // External OFF
device.externalLedToggle();   // External Toggle

// Get status
const status = await device.getStatus();
// Returns: { builtin_led: 1/0, external_led: 1/0, rssi: -45, ip: "192.168.1.100", device: "ESP32-LED-01" }

// Get device info
const info = await device.getDeviceInfo();
// Returns: { device_id, firmware_version, mac_address, builtin_led_pin, external_led_pin, button_pin, control_website }

// Check if online
const isOnline = await device.checkOnline();

// Auto-update every 2 seconds
device.startAutoUpdate(2);

// Listen for updates
window.addEventListener('esp32StatusUpdate', (event) => {
  console.log(event.detail.device);  // Device name
  console.log(event.detail.status);  // Status object
});

// Stop auto-update
device.stopAutoUpdate();
```

---

## 🧪 Testing Checklist

- [ ] Code compiles without errors in Arduino IDE
- [ ] Serial Monitor shows startup messages with IP address
- [ ] WiFi connects successfully (shows "✓ WiFi Connected!")
- [ ] Can access web dashboard at ESP32's IP address
- [ ] Built-in LED turns on/off from web button clicks
- [ ] Built-in LED toggles when pressing Boot button (GPIO 0)
- [ ] External LED works when connected to GPIO 4 with 220Ω resistor
- [ ] Serial Monitor shows command execution logs
- [ ] Website widget displays device status
- [ ] Website widget controls both LEDs properly
- [ ] No errors in browser console (F12)
- [ ] Works on mobile phone same WiFi network

---

## 🔧 Troubleshooting

### "Board not recognized" Error
- **Cause**: USB driver not installed
- **Solution**: Install CH340 USB driver (for some ESP32 boards)
- **Download**: http://www.wch.cn/product/ch340.html

### "WiFi Connection Failed"
- **Cause**: Wrong SSID or password
- **Solution**: 
  - Check spelling (case-sensitive)
  - Ensure network is 2.4GHz (not 5GHz)
  - Try network without special characters in password

### "Compile Error: 'ArduinoJson.h' not found"
- **Cause**: ArduinoJson library not installed
- **Solution**: 
  - Go to Sketch → Include Library → Manage Libraries
  - Search for "ArduinoJson"
  - Install version 6.x

### "Can't access IP address in browser"
- **Cause**: Wrong IP or not on same network
- **Solution**:
  - Verify IP from Serial Monitor (Baud 115200)
  - Check computer and ESP32 on same WiFi
  - Use http:// not https://
  - Try http://192.168.1.100 (common default)

### "Built-in LED not lighting up"
- **Cause**: LED is very dim
- **Solution**: View in dark room; very faint blue glow is normal
- **Alternative**: Connect external LED to GPIO 4

### "Website widget not connecting"
- **Cause**: CORS issue or wrong IP
- **Solution**:
  - Check browser console (F12) for error messages
  - Verify both website and ESP32 on same network
  - Try http://192.168.X.X (get X.X from your network)

---

## 📝 Default Credentials & Settings

| Setting | Value |
|---------|-------|
| Built-in LED Pin | GPIO 2 |
| Boot Button Pin | GPIO 0 |
| External LED Pin | GPIO 4 |
| Web Server Port | 80 (HTTP) |
| Serial Baud Rate | 115200 |
| WiFi Mode | 2.4GHz only (no 5GHz) |
| Status Update Interval | Every 2 seconds (website) |
| Button Debounce Time | 200ms |

---

## 🎓 Learning Outcomes

After completing this project, you will understand:
1. ✅ How to program ESP32 microcontrollers using Arduino IDE
2. ✅ WiFi connectivity and configuration on embedded devices
3. ✅ Building REST APIs on microcontrollers
4. ✅ Cross-origin resource sharing (CORS) and security
5. ✅ Real-time webpage-to-device communication
6. ✅ Hardware abstraction using GPIO pins
7. ✅ Interrupt handlers for button input
8. ✅ JSON data format and parsing
9. ✅ Debugging embedded systems with Serial Monitor
10. ✅ Responsive web design for IoT devices

---

## 📚 Additional Resources

- **ESP32 Official Documentation**: https://docs.espressif.com/projects/esp-idf/en/latest/esp32/
- **Arduino Board Support**: https://github.com/espressif/arduino-esp32
- **ArduinoJson Library**: https://arduinojson.org/
- **WiFi Configuration**: https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/network/esp_wifi.html

---

## 📧 Support & Questions

- Check the "Troubleshooting & FAQs" section on the Workshop page
- Review Serial Monitor output for detailed error messages
- Test each component individually (LED, button, WiFi)
- Verify all connections before troubleshooting code

---

## ✅ Project Status

**Current Version**: 1.0 - Production Ready  
**Last Updated**: February 2026  
**Status**: ✅ Fully Tested & Documented

This project is **ready for immediate use** with no modifications needed!

---

*Created by Nijan Dangal | IoT Workshop Project*
