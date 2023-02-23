const logoSection = document.querySelector(".logo-section");
const losingMessage = document.querySelector(".you-lose");
const winningMessage = document.querySelector(".you-win");
const lostRestart = document.querySelector(".lost-restart");
const winRestart = document.querySelector(".win-restart");

let teamsArr = [];
let teamsClicked = 0;
class Team {
  constructor(team, logo) {
    this.team = team;
    this.logo = logo;
    this.score = 0;
  }
}

const generateTeamCard = (team) => {
  let html = `<div class="logo-card">
  <img src="${team.logo}" alt=${team.team} class="item" id="${team.team}">
</div>`;

  logoSection.innerHTML += html;
};

const youWin = () => {
  logoSection.style.display = "none";
  winningMessage.style.display = "block";
  console.log("game over");
};

const youLose = () => {
  logoSection.style.display = "none";
  losingMessage.style.display = "block";

  console.log("game over");
};

const letsPlay = () => {
  logoSection.addEventListener("click", (e) => {
    console.log(e.target);
    let itemID = e.target.getAttribute("id");
    console.log(itemID);

    // increment team click count
    for (let i = 0; i < teamsArr.length; i++) {
      if (teamsArr[i].team === itemID) {
        teamsArr[i].score++;
        teamsClicked++;
        console.log(teamsArr[i]);
      }
    }

    teamsArr.forEach((team) => {
      // check if team click count is > 1
      if (team.score > 1) {
        youLose();
      } else if (team.score < 2 && teamsClicked === 12) {
        youWin();
      } else {
        // shuffle array if a team square is clicked
        if (e.target.classList.contains("item")) {
          let ranArray = shuffle(teamsArr);
          logoSection.innerHTML = "";

          ranArray.forEach((item) => {
            generateTeamCard(item);
          });
        }
      }
    });
  });
};

const getTeams = async () => {
  const response = await fetch("teams.json");
  const data = await response.json();

  data.forEach((team) => {
    let newTeam = new Team(team.team, team.logo);
    teamsArr.push(newTeam);
  });

  data.forEach((team) => {
    generateTeamCard(team);
  });

  console.log(teamsArr);
};

getTeams();
letsPlay();

lostRestart.addEventListener("click", () => {
  // winningMessage.style.display = "none";
  // losingMessage.style.display = "none";
  // getTeams();
  // logoSection.style.display = "grid";
  // teamsArr.forEach((team) => {
  //   team.score = 0;
  // });
  // console.log("-------------");
  // console.log(teamsArr);
  // letsPlay();
  document.location.reload();
});

winRestart.addEventListener("click", () => {
  document.location.reload();
});

// let fam = ["cody", "brooke", "nora", "levi", "mason"];

// Fisher-Yates shuffle algorithm
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
