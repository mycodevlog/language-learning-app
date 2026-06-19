let sentences = [];

// =====================
// LOAD TEXT AREA → LIST
// =====================
function loadSentences() {
  const text = document.getElementById("inputText").value;

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

  sentences.forEach((s, index) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = s;

    div.onclick = () => speak(s);

    list.appendChild(div);
  });
}

// =====================
// SPEECH FUNCTION
// =====================
function speak(text, repeat = null) {
  const speed = parseFloat(document.getElementById("speed").value);
  const repeatCount = repeat || parseInt(document.getElementById("repeat").value);

  let count = 0;

  function play() {
    if (count >= repeatCount) return;

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
// PLAY ALL SENTENCES
// =====================
function playAll() {
  const speed = parseFloat(document.getElementById("speed").value);
  const repeatCount = parseInt(document.getElementById("repeat").value);

  let i = 0;

  function next() {
    if (i >= sentences.length) return;

    let count = 0;

    function repeatSpeak() {
      if (count >= repeatCount) {
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
