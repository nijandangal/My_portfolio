const esp32IP = "http://192.168.1.95"; // replace with your ESP32 IP

function sendCmd(cmd) {
  fetch(esp32IP + cmd)
    .then(res => res.json())
    .then(data => {
      document.getElementById("status").innerText = "Status: " + data.status;
    })
    .catch(err => console.error(err));
}