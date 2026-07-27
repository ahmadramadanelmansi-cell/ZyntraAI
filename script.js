const btn = document.getElementById("sendBtn");

btn.onclick = async function () {
  const input = document.getElementById("prompt");
  const response = document.getElementById("response");

  if (input.value.trim() === "") return;

  const message = input.value;

  response.innerHTML += `
    <div class="user">${message}</div>
  `;

  input.value = "";

  const loading = document.createElement("div");
  loading.className = "bot";
  loading.innerHTML = "🤖 Thinking...";
  response.appendChild(loading);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message
      })
    });

    const data = await res.json();

    loading.innerHTML = "🤖 " + (data.reply || "No response");

  } catch (err) {
    loading.innerHTML = "❌ Error: " + err.message;
  }

  response.scrollTop = response.scrollHeight;
};
