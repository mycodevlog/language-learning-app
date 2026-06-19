let sentences = [];

// =========================
// LOAD SENTENCES FROM TEXTAREA
// =========================
function loadSentences() {
  const text = document.getElementById("inputText").value.trim();

  if (!text) {
    alert("Please paste sentences first");
    return;
  }

  sentences = text
    .split("\n")
    .map(s => s.trim())
    .filter(s => s.length > 0);

  render();
}

// =========================
// RENDER SENTENCES ON SCREEN
// =========================
function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  sentences.forEach((sentence) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = sentence;

    div.onclick = () => speak(sentence);

    list.appendChild(div);
  });
}

// =========================
// SPEAK ONE SENTENCE
// =========================
function speak(text, repeatOverride = null) {
  const speed = parseFloat(document.getElementById("speed").value);
  const repeat = repeatOverride || parseInt(document.getElementById("repeat").value);

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

// =========================
// PLAY ALL SENTENCES
// =========================
function playAll() {
  if (sentences.length === 0) {
    alert("Load sentences first");
    return;
  }

  const speed = parseFloat(document.getElementById("speed").value);
  const repeat = parseInt(document.getElementById("repeat").value);

  let i = 0;

  function nextSentence() {
    if (i >= sentences.length) return;

    let count = 0;

    function repeatSpeak() {
      if (count >= repeat) {
        i++;
        nextSentence();
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

  nextSentence();
}
