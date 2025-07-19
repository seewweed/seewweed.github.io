// DOM要素の取得
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");

const questionEl = document.getElementById("question");
const inputEl = document.getElementById("input");
const submitBtn = document.getElementById("submit");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const accuracyEl = document.getElementById("accuracy");
const progressEl = document.getElementById("progress");

const finalScoreEl = document.getElementById("final-score");
const finalAccuracyEl = document.getElementById("final-accuracy");
const rankingEl = document.getElementById("ranking");
const nSelect = document.getElementById("n-select");

let maxQuestions = 10;
let questionCount = 0;
let correct = 0;
let total = 0;
let score = 0;
let currentAnswer = 0;

// スクリーン表示切り替え
function showScreen(name) {
  startScreen.classList.remove("visible");
  gameScreen.classList.remove("visible");
  endScreen.classList.remove("visible");

  if (name === "start") startScreen.classList.add("visible");
  if (name === "game") gameScreen.classList.add("visible");
  if (name === "end") endScreen.classList.add("visible");
}

// ゲーム開始
function startGame() {
  maxQuestions = parseInt(nSelect.value);
  questionCount = 0;
  correct = 0;
  total = 0;
  score = 0;

  scoreEl.textContent = "得点: 0";
  accuracyEl.textContent = "正解率: 0%";
  progressEl.textContent = `進行: 0 / ${maxQuestions}`;
  inputEl.value = "";
  resultEl.textContent = "";

  showScreen("game");
  generateQuestion();
}

// 新しい問題を出す
function generateQuestion() {
  const a = getRandomInt(1, 9);
  const b = getRandomInt(1, 9);
  currentAnswer = a + b;
  questionEl.textContent = `${a} + ${b} = ?`;
  inputEl.value = "";
  inputEl.focus();
}

// 回答ボタン押下 or Enterキー
function handleSubmit() {
  const userAnswer = parseInt(inputEl.value);
  if (isNaN(userAnswer)) return;

  total++;
  questionCount++;

  if (userAnswer === currentAnswer) {
    score += 10;
    correct++;
    resultEl.textContent = "✅ 正解！";
  } else {
    score = Math.max(0, score - 5);
    resultEl.textContent = `❌ 不正解（正解: ${currentAnswer}）`;
  }

  scoreEl.textContent = `得点: ${score}`;
  accuracyEl.textContent = `正解率: ${(correct / total * 100).toFixed(1)}%`;
  progressEl.textContent = `進行: ${questionCount} / ${maxQuestions}`;

  if (questionCount >= maxQuestions) {
    setTimeout(endGame, 1000);
  } else {
    setTimeout(() => {
      resultEl.textContent = "";
      generateQuestion();
    }, 1000);
  }
}

// 終了処理
function endGame() {
  showScreen("end");
  finalScoreEl.textContent = `最終得点: ${score} 点`;
  finalAccuracyEl.textContent = `正解率: ${(correct / total * 100).toFixed(1)}%`;

  saveScore(score);
  showRanking();
}

// スコア保存
function saveScore(score) {
  const scores = JSON.parse(localStorage.getItem("nback-scores")) || [];
  scores.push({ score, date: new Date().toISOString() });
  scores.sort((a, b) => b.score - a.score);
  localStorage.setItem("nback-scores", JSON.stringify(scores.slice(0, 5)));
}

// スコア表示
function showRanking() {
  const scores = JSON.parse(localStorage.getItem("nback-scores")) || [];
  let html = "<h3>過去の上位スコア</h3><ul>";
  if (scores.length === 0) {
    html += "<li>記録なし</li>";
  } else {
    scores.forEach((entry, i) => {
      const date = new Date(entry.date).toLocaleDateString();
      html += `<li>${i + 1}. ${entry.score}点（${date}）</li>`;
    });
  }
  html += "</ul>";
  rankingEl.innerHTML = html;
}

// 最初に戻る
function backToStart() {
  showScreen("start");
  showRanking();
}

// 再挑戦
function restartGame() {
  questionCount = 0;
  correct = 0;
  total = 0;
  score = 0;

  scoreEl.textContent = "得点: 0";
  accuracyEl.textContent = "正解率: 0%";
  progressEl.textContent = `進行: 0 / ${maxQuestions}`;
  inputEl.value = "";
  resultEl.textContent = "";

  showScreen("game");
  generateQuestion();
}

// ランダム整数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// イベントリスナー
submitBtn.addEventListener("click", handleSubmit);
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSubmit();
});
document.addEventListener("DOMContentLoaded", showRanking);
