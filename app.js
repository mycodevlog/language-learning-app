let sentences = [];

// =========================
// LOAD SENTENCES
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
// RENDER LIST
// =========================
function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  sentences.forEach(sentence => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = sentence;

    div.onclick = () => speak(sentence);

    list.appendChild(div);
  });
}

// =========================
// SPEAK SINGLE SENTENCE
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
// PLAY ALL (FIXED)
// =========================
function playAll() {
  if (!sentences.length) {
    alert("Load sentences first");
    return;
  }

  speechSynthesis.cancel();

  const speed = parseFloat(document.getElementById("speed").value);
  const repeat = parseInt(document.getElementById("repeat").value);

  let i = 0;

  function speakNext() {
    if (i >= sentences.length) return;

    let count = 0;

    function repeatSpeak() {
      if (count >= repeat) {
        i++;
        setTimeout(speakNext, 300);
        return;
      }

      const utter = new SpeechSynthesisUtterance(sentences[i]);
      utter.rate = speed;

      utter.onend = () => {
        count++;
        setTimeout(repeatSpeak, 150);
      };

      speechSynthesis.speak(utter);
    }

    repeatSpeak();
  }

  speakNext();
}

// =========================
// TEST SPEECH
// =========================
function testSpeech() {
  speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance("Hello, this is a test");
  utter.rate = 1;
  speechSynthesis.speak(utter);
}
