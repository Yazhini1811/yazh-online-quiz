const quizData = [
  {
    question:"Which language runs in a web browser?",
    options:["Java","C","Python","JavaScript"],
    answer:3
  },
  {
    question:"What does CSS stand for?",
    options:[
      "Computer Style Sheets",
      "Creative Style System",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    answer:2
  },
  {
    question:"Which HTML tag is used for JavaScript?",
    options:["<js>","<script>","<javascript>","<code>"],
    answer:1
  },
  {
    question:"Which is not a JavaScript framework?",
    options:["React","Angular","Vue","Django"],
    answer:3
  },
  {
    question:"Which company developed Java?",
    options:["Google","Microsoft","Sun Microsystems","IBM"],
    answer:2
  }
];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const countEl = document.getElementById("count");
const progressBar = document.getElementById("progressBar");
const quizBox = document.querySelector(".quiz-box");

let current = 0;
let score = 0;
let selected = false;

loadQuestion();

function loadQuestion(){
  selected = false;
  nextBtn.disabled = true;

  const q = quizData[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  countEl.textContent = `${current+1} / ${quizData.length}`;
  progressBar.style.width =
    ((current)/quizData.length)*100 + "%";

  q.options.forEach((opt,index)=>{
    const div = document.createElement("div");
    div.classList.add("option");
    div.textContent = opt;
    div.onclick = () => selectOption(div,index);
    optionsEl.appendChild(div);
  });
}

function selectOption(element,index){

  if(selected) return;
  selected = true;

  const correct = quizData[current].answer;
  const all = document.querySelectorAll(".option");

  all.forEach(btn=>{
    btn.style.pointerEvents="none";
  });

  if(index === correct){
    element.classList.add("correct");
    score++;
  }else{
    element.classList.add("wrong");
    all[correct].classList.add("correct");
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click",()=>{
  current++;

  if(current < quizData.length){
    loadQuestion();
  }else{
    showResult();
  }
});

function showResult(){

  progressBar.style.width="100%";

  quizBox.innerHTML = `
    <div class="result">
      <h2>Quiz Completed</h2>
      <p>You scored</p>
      <h1>${score} / ${quizData.length}</h1>
      <button onclick="restart()">Restart</button>
    </div>
  `;
}

function restart(){
  current = 0;
  score = 0;
  quizBox.innerHTML = `
    <h2 id="question"></h2>
    <div id="options" class="options"></div>
    <div class="footer">
      <span id="count"></span>
      <button id="nextBtn" disabled>Next</button>
    </div>
  `;

  location.reload();
}
