
// 1. Create the Widget
const widget = document.createElement('div');
widget.id = 'semantic-ai-widget';
widget.style = "position:fixed; bottom:20px; right:20px; width:280px; background:#1e1e1e; color:white; border:2px solid #ff4b4b; border-radius:12px; padding:15px; z-index:9999999; font-family:sans-serif; box-shadow:0 5px 15px rgba(0,0,0,0.5);";
widget.innerHTML = `
    <div style="font-weight:bold; color:#ff4b4b; margin-bottom:10px;">🤖 AI Scout Agent</div>
    <input type="text" id="goal-input" placeholder="What is your goal?" style="width:100%; background:#333; color:white; border:1px solid #555; padding:8px; margin-bottom:10px; border-radius:4px; box-sizing:border-box;">
    <button id="find-btn" style="width:100%; background:#ff4b4b; color:white; border:none; padding:10px; border-radius:4px; cursor:pointer; font-weight:bold;">Find & Auto-Open</button>
    <div id="ai-res" style="margin-top:10px; font-size:12px; color:#aaa;">Enter goal to start scouting...</div>
`;
document.body.appendChild(widget);

// 2. The Auto-Open Logic
document.getElementById('find-btn').addEventListener('click', async () => {
    const goal = document.getElementById('goal-input').value;
    const resBox = document.getElementById('ai-res');

    if(!goal) {
        resBox.innerText = "⚠️ Please enter a goal.";
        return;
    }

    resBox.innerHTML = "🕵️ Agent is scouting... <br><b>Python is analyzing the site structure.</b>";

    try {
        const response = await fetch('http://127.0.0.1:5000/find-best', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                url: window.location.href,
                goal: goal
            })
        });

        const data = await response.json();

        if (data.best_url) {
            resBox.innerHTML = `<span style="color:#00ff00;">🎯 Found: ${data.title}</span><br><b>Opening now...</b>`;

            // --- THE REDIRECT ---
            // We wait 1 second so you can see the name of the page found before it jumps
            setTimeout(() => {
                window.location.href = data.best_url;
            }, 1000);

        } else {
            resBox.innerText = "❌ No relevant pages found.";
        }
    } catch (e) {
        resBox.innerText = "❌ Backend Error. Make sure end.py is running.";
    }
});
