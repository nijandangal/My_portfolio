#include <WiFi.h>
#include <WebServer.h>

// ===== CHANGE THESE =====
const char* ssid = "YOUR_SSID";
const char* password = "YOUR_PASSWORD";
// ========================

#define LED_PIN 2  // Built-in LED on GPIO 2

WebServer server(80);
bool ledState = false;
bool blinkEnabled = false;
unsigned long blinkInterval = 500; // milliseconds
unsigned long lastToggle = 0;

void handleRoot();
void handleOn();
void handleOff();
void handleToggle();
void handleBlink();
void handleStatus();

void setup() {
  Serial.begin(115200);
  delay(1000);

  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);

  Serial.println("Connecting to WiFi: " + String(ssid));
  WiFi.begin(ssid, password);

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 40) {
    delay(500);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi Connected!");
    Serial.println("IP: http://" + WiFi.localIP().toString());

    // Setup web routes
    server.on("/", handleRoot);
    server.on("/on", handleOn);
    server.on("/off", handleOff);
    server.on("/toggle", handleToggle);
    server.on("/blink", handleBlink);
    server.on("/status", handleStatus);
    server.begin();
  } else {
    Serial.println("\nWiFi failed to connect");
  }
}

void loop() {
  server.handleClient();

  // Non-blocking blinking controlled by millis()
  if (blinkEnabled) {
    unsigned long now = millis();
    if (now - lastToggle >= blinkInterval) {
      ledState = !ledState;
      digitalWrite(LED_PIN, ledState ? HIGH : LOW);
      lastToggle = now;
    }
  }
}

// Handle root page - portfolio-themed HTML dashboard
void handleRoot() {
  const char* html = R"RAWHTML(<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Portfolio — ESP32 LED Control</title>
  <style>
    body{font-family:Arial,Helvetica,sans-serif;background:#f3f4f6;margin:0;padding:20px}
    .card{max-width:640px;margin:20px auto;background:#fff;border-radius:12px;padding:20px;box-shadow:0 8px 30px rgba(2,6,23,0.06)}
    .header{display:flex;justify-content:space-between;align-items:center}
    h1{font-size:20px;margin:0;color:#111}
    p.lead{color:#555;margin:8px 0}
    .controls{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}
    button{padding:10px 14px;border:0;border-radius:8px;background:#667eea;color:#fff;cursor:pointer}
    .muted{background:#e5e7eb;color:#111}
    .section{margin-top:16px}
    label{display:block;margin-bottom:6px;color:#333}
    input[type=range]{width:100%}
    .status-box{margin-top:12px;padding:10px;background:#f8fafc;border-radius:6px;color:#111}
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>ESP32 — LED Control (Portfolio)</h1>
      <small>Project 1</small>
    </div>
    <p class="lead">Control the built-in LED (GPIO 2). Use steady ON/OFF or enable blinking with adjustable speed. This lightweight dashboard is served directly from your ESP32 and is optimized for low CPU usage.</p>

    <div class="section">
      <div class="controls">
        <button onclick="fetch('/on')">ON</button>
        <button onclick="fetch('/off')">OFF</button>
        <button onclick="fetch('/toggle')">Toggle</button>
      </div>
    </div>

    <div class="section">
      <label for="speed">Blink speed (ms): <span id="speedVal">500</span></label>
      <input id="speed" type="range" min="50" max="2000" step="10" value="500" oninput="document.getElementById('speedVal').textContent=this.value">
      <div class="controls" style="margin-top:10px">
        <button onclick="startBlink()">Start Blink</button>
        <button class="muted" onclick="stopBlink()">Stop Blink</button>
      </div>
      <div class="controls" style="margin-top:10px">
        <button onclick="fetch('/blink?action=start&speed=150')">Fast</button>
        <button onclick="fetch('/blink?action=start&speed=500')">Medium</button>
        <button onclick="fetch('/blink?action=start&speed=1000')">Slow</button>
      </div>
    </div>

    <div class="section status-box" id="status">Loading status...</div>
  </div>

  <script>
    async function updateStatus(){
      try{
        const r = await fetch('/status');
        const d = await r.json();
        document.getElementById('status').textContent = 'LED: ' + (d.state? 'ON':'OFF') + ' — Blink: ' + (d.blink? 'ON':'OFF') + ' — Speed: ' + (d.speed || '-') + ' ms';
      }catch(e){ document.getElementById('status').textContent = 'Status unavailable'; }
    }
    function startBlink(){
      const speed = document.getElementById('speed').value;
      fetch('/blink?action=start&speed='+speed).then(()=>updateStatus());
    }
    function stopBlink(){
      fetch('/blink?action=stop').then(()=>updateStatus());
    }
    updateStatus();
    // Poll the status less often to keep ESP32 balanced
    setInterval(updateStatus,5000);
  </script>
</body>
</html>)RAWHTML";

  server.send(200, "text/html", html);
}

void handleOn() {
  blinkEnabled = false;
  digitalWrite(LED_PIN, HIGH);
  ledState = true;
  server.send(200, "application/json", "{\"success\":true,\"state\":1}");
}

void handleOff() {
  blinkEnabled = false;
  digitalWrite(LED_PIN, LOW);
  ledState = false;
  server.send(200, "application/json", "{\"success\":true,\"state\":0}");
}

void handleToggle() {
  blinkEnabled = false;
  ledState = !ledState;
  digitalWrite(LED_PIN, ledState ? HIGH : LOW);
  server.send(200, "application/json", String("{\\"success\\":true,\\"state\\":") + (ledState?"1":"0") + "}");
}

void handleBlink() {
  String action = server.arg("action");
  String speedStr = server.arg("speed");
  if (action == "start") {
    if (speedStr.length() > 0) {
      long s = speedStr.toInt();
      blinkInterval = (s < 100) ? 100UL : (unsigned long)s;
    }
    blinkEnabled = true;
    server.send(200, "application/json", String("{\\"success\\":true,\\"blink\\":true,\\"speed\\":") + String(blinkInterval) + "}");
  } else if (action == "stop") {
    blinkEnabled = false;
    server.send(200, "application/json", "{\"success\":true,\"blink\":false}");
  } else if (action == "set") {
    if (speedStr.length() > 0) {
      long s = speedStr.toInt();
      blinkInterval = (s < 100) ? 100UL : (unsigned long)s;
    }
    server.send(200, "application/json", String("{\\"success\\":true,\\"speed\\":") + String(blinkInterval) + "}");
  } else {
    server.send(400, "application/json", "{\"success\":false,\"error\":\"invalid action\"}");
  }
}

void handleStatus() {
  int state = digitalRead(LED_PIN);
  String json = String("{\\"state\\":") + String(state?1:0) + String(",\\"ip\\":\\"") + WiFi.localIP().toString() + String("\\",\\"blink\\":") + String(blinkEnabled?1:0) + String(",\\"speed\\":") + String(blinkInterval) + String("}");
  server.send(200, "application/json", json);
}
