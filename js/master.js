/* Start Selectors */
let mode = document.querySelector(".mode i");
let category = document.querySelector("select");
let quesionsCount = document.querySelector(".quiz-info .count span");
let bullets = document.querySelector(".bullets");
let spanBullets = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answerArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let results = document.querySelector(".results");
let countDown = document.querySelector(".countdown");
/* End Selectors */
/*----------------------------------------------------*/
/* Start Global Variables */
let type = "general";
let questions;
let questoinsCount;
let index = 0;
let choosenAnswer = null;
let rightAnswers = 0;
let countDownInterval;
let duration;

let localType = localStorage.getItem("setType");

if(localType !== null){
  type = localType;
}else{
  type = "general";
}
/* End Global Variables */
/*----------------------------------------------------*/
/* Start Mode */
let localMode = localStorage.getItem("mode");

if(localMode !== null){
  if(localMode === "dark"){
    mode.className = "fa-solid fa-sun";
    document.body.classList.remove("light");
  }else{
    mode.className = "sun fa-solid fa-moon";
    document.body.classList.add("light");
  }
}

mode.onclick = function (){
  document.body.classList.toggle("light");

  if(this.className === "fa-solid fa-sun"){
    this.className = "fa-solid fa-moon";
    localStorage.setItem("mode", "light");
  }else{
    this.className = "fa-solid fa-sun";
    localStorage.setItem("mode", "dark");
  }
}
/* End Mode */
/*----------------------------------------------------*/
/* Start Type Of Questuins */
category.addEventListener("change", function() {
  type = this.options[this.selectedIndex].value;
  localStorage.setItem("setType", type);
  window.location.reload();
})
window.onload = function (){
  category.value = type;
}
/* End Type Of Questuins */
/*----------------------------------------------------*/
/* Start Get Questions */
function getQuestions() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      questions = JSON.parse(this.responseText);

      questoinsCount = questions.length;

      choosenAnswer = null;
      createBullets(questoinsCount);
      addQuestions(questions[index], questoinsCount);
      countDownTime(questoinsCount);

      submitButton.onclick = function () {
        checkAnswers(questions[index]);
        if(choosenAnswer !== questions[index]["right_answer"]){
          clearInterval(countDownInterval);
          countDown.style.display = "none";
          quizArea.innerHTML = `<h2>The Right Answer Is : ${questions[index]["right_answer"]}</h2>`;
          answerArea.style.display = "none";
          submitButton.style.display = "none";
          setTimeout(function () {

            index++;

            quizArea.innerHTML = "";
            answerArea.innerHTML = "";

            addQuestions(questions[index], questoinsCount);

            handleSpans();

            countDownTime(questoinsCount);

            showResults(questoinsCount);
          }, 2250)
        }else{
          index++;

          quizArea.innerHTML = "";
          answerArea.innerHTML = "";

          addQuestions(questions[index], questoinsCount);

          handleSpans();

          clearInterval(countDownInterval);
          countDownTime(questoinsCount);

          showResults(questoinsCount);
        }
      };
    }
  };

  request.open("GET", `json/${type}.json`, true);
  request.send();
}

getQuestions();
/* End Get Questions */
/*----------------------------------------------------*/
/* Start Bullets */
function createBullets(count) {
  // Change Number Of Questions Dynamically
  quesionsCount.innerHTML = count;

  // Add Number Of Spans Dynamically To Bullets Equal To Number Of Questions
  for(let i = 1; i <= count; i++){
    let span = document.createElement("span");

    if(i === 1){
      span.className = "current";
    }

    spanBullets.appendChild(span);
  }
}
/* End Bullets */
/*----------------------------------------------------*/
/* Start Add Questions */
function addQuestions(obj, count) {
  if(index < count){
    answerArea.style.display = "block";
    submitButton.style.display = "block";
    countDown.style.display = "block";
    // Add H2 To Quiz Area
    let QuestionTitle = document.createElement("h2");
    let QuestionText = document.createTextNode(obj["title"]);

    QuestionTitle.appendChild(QuestionText);
    quizArea.appendChild(QuestionTitle);

    // Add Options To Answers Area
    for(let i = 1; i <= 4; i++){
      // Create Answer Div
      let answer = document.createElement("div");
      answer.className = "answer";
      answerArea.appendChild(answer);

      // Create Input
      let input = document.createElement("input");
      input.type = "radio";
      input.id = `answer_${i}`;
      input.name = "answer";
      input.dataset.answer = obj[`answer_${i}`];

      // if(i === 1){
        // input.checked = true;
      // }

      answer.appendChild(input);

      // Create Label
      let label = document.createElement("label");
      label.htmlFor = `answer_${i}`;
      let labelText = document.createTextNode(obj[`answer_${i}`]);
      label.appendChild(labelText);

      answer.appendChild(label);
    }
  }
}
/* End Add Questions */
/*----------------------------------------------------*/
/* Start Check Answers */
let checkAnswers = function (rAnswer) {
  let options = document.getElementsByName("answer");

  if(index < questoinsCount){
    for(let i = 0; i < options.length; i++){
      if(options[i].checked){
        choosenAnswer = options[i].dataset.answer;
      }
    }

    if(choosenAnswer === rAnswer["right_answer"]){
      spanBullets.querySelectorAll("span")[index].className = "on";
      rightAnswers++;
    }else{
      spanBullets.querySelectorAll("span")[index].className = "off";
    }
  }
};
/* End Check Answers */
/*----------------------------------------------------*/
/* Start Handle Spans */
function handleSpans() {
  let spans = document.querySelectorAll(".bullets .spans span");

  spans.forEach((span, currentIndex) => {
    if(currentIndex === index){
      span.className = "current";
    }
  });
}
/* End Handle Spans */
/*----------------------------------------------------*/
/* Start Show Resutls */
function showResults(count) {
  if(count === index){
    quizArea.remove();
    answerArea.remove();
    bullets.remove();
    submitButton.remove();

    let resultShow;

    if(rightAnswers >= (count - 2)){
      resultShow = `<span class="perfect">Perfect</span>, You Answered ${rightAnswers} From ${count}`;
    } else if(rightAnswers > count / 2 && rightAnswers < (count - 2)){
      resultShow = `<span class="good">Good</span>, You Answered ${rightAnswers} From ${count}`;
    } else {
      resultShow = `<span class="bad">Bad</span>, You Answered ${rightAnswers} From ${count}`;
    }

    results.innerHTML = resultShow;
    results.classList.add("active");
  }
}
/* End Show Resutls */
/*----------------------------------------------------*/
/* Start Count Down */
function countDownTime(count) {
  let minutes, seconds;
  duration = 15;
  countDownInterval = setInterval(() => {
    if(index < count){
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countDown.innerHTML = `${minutes} : ${seconds}`;
    }

    if(--duration < 0){
      clearInterval(countDownInterval);
      if(!choosenAnswer){
        quizArea.innerHTML = `<h2>The Right Answer Is : ${questions[index]["right_answer"]}</h2>`;
        answerArea.style.display = "none";
        submitButton.style.display = "none";
        spanBullets.querySelectorAll("span")[index].className = "off";
      }
      setTimeout(function () {
        submitButton.click();

      }, 2250)
    }
  }, 1000);
}
/* End Count Down */
