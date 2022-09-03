
// scripting 

  const options=document.querySelector(".options").children;
  const answerTrackerContainer=document.querySelector(".answers-tracker");
  const questionNumberSpan=document.querySelector(".question-num-value");
  const totalQuestionSpan=document.querySelector(".total-question");
  const correctAnswerSpan=document.querySelector(".correct-answers");
  const totalQuestionSpan2=document.querySelector(".total-question2");
  const percentage=document.querySelector(".percentage");
  const question=document.querySelector(".question");
  const op1=document.querySelector(".select1");
  const op2=document.querySelector(".select2");
  const op3=document.querySelector(".select3");
  const op4=document.querySelector(".select4");
  let questionIndex;
  let index=0;
  let myArray=[];
  let myArr=[];
  let score=0;

// These are the questions, options along with answers.

  const questions=[
   {
    q:'What does CSS stand for?',
    options:['Cascading CSS','Cascading style sheets','Cascading separate style','Cascading sheets style'],
    answer:2
   },
   {
    q:'Which attribute can set text to bold?',
    options:['Text-decoration','Font style','Font weight','None of the above'],
    answer:3
   },
   {
    q:'Which measurement unit is relative?',
    options:['Inch','Cm','MM','Em'],
    answer:4
   },
   {
    q:'Which measurement unit is NOT relative?',
    options:['Px','Cm','%','Em'],
    answer:2
   },
   {
    q:'What attribute is used move an element content away from its border?',
    options:['Margin','Padding','Border','Width'],
    answer:2
   },
   {
    q:'Which attribute does not contribute to a block elements total width?',
    options:['Background-image','Padding','Border','Width'],
    answer:1
   },
   {
    q:'What property changes positioned elements display order?',
    options:['Width','Background','Azimuth','Z-index'],
    answer:4
   },
   {
    q:'Which value of background-repeat will cause a background to repeat vertically?',
    options:['Repeat-x','Repeat','Repeat-y','No-repeat'],
    answer:3 
   },
   {
    q:'Which tag is used to link an external CSS file?',
    options:['Link','Join','Script','Rel'],
    answer:1
   },
   {
    q:'Which attribute sets the underline property?',
    options:['Font style','Font underline','Font weight','Text-decoration'],
    answer:4
   }
 
  ]


  totalQuestionSpan.innerHTML=questions.length;
  function load(){
        questionNumberSpan.innerHTML=index+1;
         question.innerHTML=questions[questionIndex].q;   
         op1.innerHTML=questions[questionIndex].options[0];
         op2.innerHTML=questions[questionIndex].options[1];
         op3.innerHTML=questions[questionIndex].options[2];
         op4.innerHTML=questions[questionIndex].options[3];
         index++;
  }

  function check(element){
   if(element.id==questions[questionIndex].answer){
    element.classList.add("correct");
    updateAnswerTracker("correct")
    score++;
    console.log("score:"+score)
   }
   else{
    element.classList.add("wrong");
    updateAnswerTracker("wrong")

   }
   disabledOptions()
  }
 
  function disabledOptions(){
     for(let i=0; i<options.length; i++) {
      options[i].classList.add("disabled");
      if(options[i].id==questions[questionIndex].answer){
       options[i].classList.add("correct");
      }

     }
  }

  function enableOptions(){
     for(let i=0; i<options.length; i++) {
      options[i].classList.remove("disabled","correct","wrong");
     }
  }

  function validate(){
      if(!options[0].classList.contains("disabled")){
        alert("Please Complete this Question")
      }
      else{
       enableOptions();
       randomQuestion();
      }
  }

  function next(){
    validate();
  }
 
  function randomQuestion(){
   let randomNumber=Math.floor(Math.random()*questions.length);
   let hitDuplicate=0;
       if(index==questions.length){
        quizOver();
       }
       else{
         if(myArray.length>0){
             for(let i=0; i<myArray.length; i++){
               if(myArray[i]==randomNumber){
                  hitDuplicate=1;
                  break;
               }
             }
             if(hitDuplicate==1){
              randomQuestion();
             }
             else{
               questionIndex=randomNumber; 
              load();
              myArr.push(questionIndex);
             }
         }
         if(myArray.length==0){
           questionIndex=randomNumber; 
           load();
           myArr.push(questionIndex);
         }

       myArray.push(randomNumber);
     
      }
  }
   
  function answerTrakcer(){
     for(let i=0; i<questions.length; i++){
      const div=document.createElement("div")
         answerTrackerContainer.appendChild(div);
     }
  }

 function updateAnswerTracker(classNam){
   answerTrackerContainer.children[index-1].classList.add(classNam);
 }

 function quizOver(){
    document.querySelector(".quiz-over").classList.add("show");
    correctAnswerSpan.innerHTML=score;
    totalQuestionSpan2.innerHTML=questions.length;
    percentage.innerHTML=(score/questions.length).toFixed(2)*100 + "%";
 }

 function tryAgain(){
     window.location.reload();
 }

 window.onload=function(){
  randomQuestion();
  answerTrakcer();

}
