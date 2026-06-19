let voices = [];
let selectedVoice = null;
let sentences = [];

// =========================
// LOAD VOICES (FRENCH)
// =========================
function loadVoices() {
  voices = speechSynthesis.getVoices();

  selectedVoice =
    voices.find(v => v.lang === "fr-FR") ||
    voices.find(v => v.lang.startsWith("fr")) ||
    null;

  console.log("Selected voice:", selectedVoice);
  console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`));
}

speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

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

    // 🇫🇷 APPLY FRENCH VOICE
    if (selectedVoice) {
      utter.voice = selectedVoice;
      utter.lang = selectedVoice.lang;
    } else {
      utter.lang = "fr-FR";
    }

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

  speechSynthesis.cancel();

  const speed = parseFloat(document.getElementById("speed").value);
  const repeat = parseInt(document.getElementById("repeat").value);

  let i = 0;

  function speakSentence() {
    if (i >= sentences.length) return;

    let count = 0;

    function repeatSpeak() {
      if (count >= repeat) {
        i++;
        setTimeout(speakSentence, 300);
        return;
      }

      const utter = new SpeechSynthesisUtterance(sentences[i]);
      utter.rate = speed;

      // 🇫🇷 APPLY FRENCH VOICE
      if (selectedVoice) {
        utter.voice = selectedVoice;
        utter.lang = selectedVoice.lang;
      } else {
        utter.lang = "fr-FR";
      }

      utter.onend = () => {
        count++;
        setTimeout(repeatSpeak, 150);
      };

      speechSynthesis.speak(utter);
    }

    repeatSpeak();
  }

  speakSentence();
}

// =========================
// TEST VOICE
// =========================
function testSpeech() {
  const utter = new SpeechSynthesisUtterance("Bonjour, ceci est un test");
  utter.rate = 1;

  if (selectedVoice) {
    utter.voice = selectedVoice;
    utter.lang = selectedVoice.lang;
  } else {
    utter.lang = "fr-FR";
  }

  speechSynthesis.speak(utter);
}
