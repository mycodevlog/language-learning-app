let sentences = [];

// =====================
// LOAD SENTENCES
// =====================
function loadSentences() {
  const text = document.getElementById("inputText").value.trim();

  if (!text) {
    alert("Please enter sentences first");
    return;
  }

  sentences = text
    .split("\n")
    .map(s => s.trim())
    .filter(s => s.length > 0);

  render();
}

// =====================
// RENDER LIST
// =====================
function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  sentences.forEach((s) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = s;

    div.onclick = () => speak(s);

    list.appendChild(div);
  });
}

// =====================
// SPEAK FUNCTION
// =====================
function speak(text, repeatCount = null) {
  const speed = parseFloat(document.getElementById("speed").value);
  const repeat = repeatCount || parseInt(document.getElementById("repeat").value);

  let count = 0;

  function play() {
    if (count >= repeat) return;

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = speed;

    utter.onend = () => {
      count++;
      play();
    };

    speechSynthesis.speak(utter);
  }

  play();
}

// =====================
// PLAY ALL
// =====================
function playAll() {
  if (sentences.length === 0) {
    alert("Load sentences first");
    return;
  }

  const speed = parseFloat(document.getElementById("speed").value);
  const repeat = parseInt(document.getElementById("repeat").value);

  let i = 0;

  function next() {
    if (i >= sentences.length) return;

    let count = 0;

    function repeatSpeak() {
      if (count >= repeat) {
        i++;
        next();
        return;
      }

      const utter = new SpeechSynthesisUtterance(sentences[i]);
      utter.rate = speed;

      utter.onend = () => {
        count++;
        repeatSpeak();
      };

      speechSynthesis.speak(utter);
    }

    repeatSpeak();
  }

  next();
}
