const STORAGE_KEY = "language_app_sentences";

let sentences = [];

// =====================
// LOAD FROM STORAGE
// =====================
function loadFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  sentences = data ? JSON.parse(data) : [];
}

// =====================
// SAVE TO STORAGE
// =====================
function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sentences));
}

// =====================
// ADD SENTENCE
// =====================
function handleAdd() {
  const topic = document.getElementById("topic").value;
  const sentence = document.getElementById("sentence").value.trim();
  const translation = document.getElementById("translation").value.trim();

  if (!sentence || !translation) return;

  const newItem = {
    id: Date.now().toString(),
    topic,
    sentence,
    translation
  };

  sentences.push(newItem);
  saveToStorage();
  renderSentences();

  document.getElementById("sentence").value = "";
  document.getElementById("translation").value = "";
}

// =====================
// DELETE SENTENCE
// =====================
function deleteSentence(id) {
  sentences = sentences.filter(item => item.id !== id);
  saveToStorage();
  renderSentences();
}

// =====================
// RENDER UI
// =====================
function renderSentences() {
  const container = document.getElementById("sentenceList");
  container.innerHTML = "";

  sentences.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${item.topic}</h3>
      <p><strong>${item.sentence}</strong></p>
      <p>${item.translation}</p>
      <button onclick="deleteSentence('${item.id}')">Delete</button>
    `;

    container.appendChild(div);
  });
}

// =====================
// INIT APP
// =====================
function init() {
  loadFromStorage();
  renderSentences();
}

init();
