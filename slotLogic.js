
  const fruits = [
    { name: 'Cherry', img: 'cherry.png', tier: 0 },
    { name: 'Lemon', img: 'lemon.png', tier: 1 },
    { name: 'Orange', img: 'orange.png', tier: 1 },
    { name: 'Plum', img: 'plum.png', tier: 1 },
    { name: 'Scatter', img: 'scatter.png', tier: 2 },
    { name: 'Watermelon', img: 'watermelon.png', tier: 3 },
    { name: 'Grape', img: 'grape.png', tier: 3 },
    { name: '7', img: 'seven.png', tier: 4 }
  ];
  
  const payouts = {
    0: [0, 1, 4, 10, 40],
    1: [0, 0, 4, 10, 40],
    2: [0, 0, 2, 10, 50],
    3: [0, 0, 10, 40, 100],
    4: [0, 0, 20, 200, 1000]
  };
  
  let balance = 200;
  let bet = 5;
  let currentWin = 0;
  let streak = 0;
  let highlights = [];
  
  const sounds = {
    spin: new Audio('./sounds/spin.mp3'),
    win: new Audio('./sounds/win.mp3'),
    big: new Audio('./sounds/bigwin.mp3'),
    broke: new Audio('./sounds/gameover.mp3'),
    goodDouble: new Audio('./sounds/happy.mp3'),
    badDouble: new Audio('./sounds/sad.mp3'),
    betUp: new Audio('./sounds/coin.mp3'),
    betDown: new Audio('./sounds/coindown.mp3')
  };
  sounds.badDouble.playbackRate = 2.4;
  sounds.betUp.playbackRate = 1.4;
  
  function play(audio) {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }
  
  document.getElementById("plusBet").onclick = () => {
    bet += 5;
    play(sounds.betUp);
    updateDisplay();
  };
  
  document.getElementById("minusBet").onclick = () => {
    if (bet > 5) {
      bet -= 5;
      play(sounds.betDown);
      updateDisplay();
    }
  };
  
  document.getElementById("spinBtn").onclick = () => {
    if (bet > balance) {
      play(sounds.broke);
      alert("Not enough money!");
      return;
    }
  
    play(sounds.spin);
    currentWin = 0;
    streak = 0;
    highlights = [];
  
    document.getElementById("doubleControls").style.display = "none";
    document.getElementById("doubleMessage").textContent = "";
  
    const grid = randomGrid();
    const win = calculateWin(grid);
  
    balance -= bet;
    balance += win;
    currentWin = win;
  
    if (win >= bet * 10) play(sounds.big);
    else if (win > 0) play(sounds.win);
  
    document.getElementById("balance").textContent = balance;
    document.getElementById("win").textContent = win;
  
    render(grid);
  
    if (win > 0) {
      document.getElementById("doubleControls").style.display = "block";
    }
  };
  
  document.querySelectorAll(".doubleBtn").forEach(btn => {
    btn.onclick = () => {
      if (streak >= 5) return;
  
      const pick = btn.dataset.choice;
      const result = Math.random() < 0.476 ? "red" : "black";
  
      let msg;
      if (pick === result) {
        play(sounds.goodDouble);
        currentWin *= 2;
        balance += currentWin / 2;
        msg = `You won! New win: ${currentWin} $`;
        streak++;
      } else {
        play(sounds.badDouble);
        balance -= currentWin;
        currentWin = 0;
        msg = "You lost all of it!";
        document.getElementById("doubleControls").style.display = "none";
      }
  
      document.getElementById("balance").textContent = balance;
      document.getElementById("win").textContent = currentWin;
      document.getElementById("doubleMessage").textContent = msg;
    };
  });
  
  function updateDisplay() {
    document.getElementById("betDisplay").textContent = bet;
  }
  
  function render(grid) {
    const box = document.getElementById("slotGrid");
    box.innerHTML = "";
    grid.forEach((id, idx) => {
      const img = document.createElement("img");
      img.src = `./img/${fruits[id].img}`;
      img.alt = fruits[id].name;
      if (highlights.includes(idx)) img.classList.add("glow");
      box.appendChild(img);
    });
  }

  function randomGrid() {
    let arr = [];
    for (let i = 0; i < 15; i++) {
      let num = Math.floor(Math.random() * 8);

      // Reduce frequency of Scatter
      if (num === 4 && Math.floor(Math.random() * 4) < 3) {
        num = Math.floor(Math.random() * 7);
        // Reduce frequency of 7 after scatter reroll
        if (num === 7 && Math.floor(Math.random() * 16 > 5)) {
          num = Math.floor(Math.random() * 6);
        }
      }

      // Prevent vertical repeats of Scatter
      if (i > 4) {
        while (num === 4 && arr[i - 5] === 4) {
          num = Math.floor(Math.random() * 8);
        }
        if (i > 9) {
          while (num === 4 && (arr[i - 5] === 4 || arr[i - 10] === 4)) {
            num = Math.floor(Math.random() * 8);
          }
        }
      }

      arr.push(num);
    }

    if (calculateWin(arr) >= bet * 10 && Math.floor(Math.random() * 22 > 13)) {
      highlights = [];
      return randomGrid();
    }

    return arr;
  }
  
  function calculateWin(arr) {
    let win = 0;
    const lines = [
      [0,1,2,3,4], [5,6,7,8,9], [10,11,12,13,14],
      [0,6,12,8,4], [10,6,2,8,14]
    ];
  
    for (let line of lines) {
      const values = line.map(i => arr[i]);
      const first = values[0];
      let match = 1;
  
      for (let j = 1; j < values.length; j++) {
        if (values[j] === first) match++;
        else break;
      }
  
      const tier = fruits[first].tier;
      const min = (first === 0 ? 2 : 3);
      if (match >= min) {
        highlights.push(...line.slice(0, match));
        win += bet * (payouts[tier][match - 1] || 0);
      }
    }
  
    // Scatter logic
    const scatters = arr.filter(i => i === 4).length;
    if (scatters >= 3) {
      win += bet * (payouts[2][scatters - 1] || 0);
      highlights.push(...arr.map((val, idx) => val === 4 ? idx : -1).filter(i => i !== -1));
    }
  
    return win;
  }


  