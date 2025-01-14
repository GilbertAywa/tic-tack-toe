  const buttonsEl = document.querySelectorAll(".key-btn");
      const resetBtn = document.querySelector(".reset-btn");
      const autoPlayBtn = document.querySelector(".auto-play-btn");
      const displayTurn = document.querySelector("h3");
      const playerXScore = document.querySelector(".playerX");
      const playerOScore = document.querySelector(".playerO");
      const promtEl = document.querySelector(".prompt-container");
      let count = 1;
      let correctLine;
      const score = {
        x: 0,
        o: 0
      };
     
      let playerX = [];
      let playerO = [];

      const correctMatch = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ];

      resetBtn.addEventListener('click', () => {
        promtEl.style.display = "flex";
        document.querySelector(".yes-btn")
          .addEventListener('click', () => {
            resetGame();
            score.o = 0;
            score.x = 0;
            updateScore();
            displayTurn.innerHTML = "Player O Turns";
            promtEl.style.display = "none";
        });

        document.querySelector(".no-btn")
          .addEventListener('click', () => {
             promtEl.style.display = "none";
        });
        
      });

      function renderMark(player, index){
        if(!playerX.includes(index) && !playerO.includes(index)){
           if(player == "X"){
             playerX.push(index);
             displayTurn.innerHTML = "Player O Turns";
           }else if(player == "O"){
             playerO.push(index);
             displayTurn.innerHTML = "Player X Turns";
           }

          count++;
          buttonsEl[index].innerHTML = player;
           
        }else{
          return;
        }
      }


      function checkWinner(playerX, playerO){
        correctMatch.forEach((line) => {
          if(
             playerX.includes(line[0]) && 
             playerX.includes(line[1]) && 
             playerX.includes(line[2])){
            
               displayTurn.innerHTML = "Player X Won 🎉 🎊";
               correctLine = line;
               MarkCorrectLine();
               setTimeout(resetGame, 3350);
               setTimeout(() => {
                 displayTurn.innerHTML = "Player O Turns";
               }, 3300);

              score.x++;
          }else if(
             playerO.includes(line[0]) && 
             playerO.includes(line[1]) && 
             playerO.includes(line[2])){

               displayTurn.innerHTML = "Player O Won 🎉 🎊";
               correctLine = line;
               MarkCorrectLine();
               setTimeout(resetGame, 2350);
               setTimeout(() => {
                 displayTurn.innerHTML = "Player O Turns";
               }, 2300);

               score.o++;
               
          }
        });
      }

      function checkDraw(playerX, playerO){
        if(playerX.length + playerO.length == 9 && count == 10){
          displayTurn.innerHTML = "Game End in Draw";
          setTimeout(resetGame, 2500);
          setTimeout(() => {
            displayTurn.innerHTML = "Player O Turns";
          }, 2300);
        }
      }

      function resetGame(){
        count = 1;
        playerX = [];
        playerO = [];
        correctLine = undefined;
        buttonsEl.forEach(button => {
          button.innerHTML = "";
          button.style.backgroundColor = "gold";
        });
        
      }

      function playerTurn(){
         let player = "X";
        
         if(count % 2){
            player = "O";
          }else{
            player = "X";
          }
          
          return player;
      }

      function MarkCorrectLine(){
        correctLine.forEach(point => {
          buttonsEl[point].style.backgroundColor = "#00ff00";
        });       
      }

      function updateScore(){
        playerXScore.innerHTML = score.x;
        playerOScore.innerHTML = score.o;
      }

      
      buttonsEl.forEach((button, index) => {
        button.addEventListener('click', () => {
          const player = playerTurn();
          renderMark(player, index);
          checkDraw(playerX, playerO);
          checkWinner(playerX, playerO);
          
          updateScore();
        });
      });
    