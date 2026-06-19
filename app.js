let data = {
  sentences: []
};

function render() {
  const list = document.getElementById("sentenceList");

  list.innerHTML = "";

  data.sentences.forEach(item => {
    list.innerHTML += `
      <div class="sentence-card">
        <strong>${item.topic}</strong>
        <p>${item.sentence}</p>
        <p class="translation">${item.translation}</p>
      </div>
    `;
  });
}

function addSentence() {

  const topic =
    document.getElementById("topicSelect").value;

  const sentence =
    document.getElementById("sentence").value;

  const translation =
    document.getElementById("translation").value;

  if (!sentence.trim()) return;

  data.sentences.push({
    id: Date.now(),
    topic,
    sentence,
    translation
  });

  document.getElementById("sentence").value = "";
  document.getElementById("translation").value = "";

  render();
}
