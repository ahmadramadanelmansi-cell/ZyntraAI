const btn = document.getElementById("sendBtn");

btn.onclick = function(){

let input = document.getElementById("prompt");

let response = document.getElementById("response");

if(input.value.trim()==""){
return;
}

response.innerHTML += `
<div class="user">
${input.value}
</div>

<div class="bot">
🤖 I'm still under development...
Soon I'll answer with real AI.
</div>
`;

input.value="";

response.scrollTop=response.scrollHeight;

}