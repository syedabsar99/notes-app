const createBtn = document.getElementById("createbtn");
const notesContainer = document.querySelector(".notes-container");
notesContainer.innerHTML = localStorage.getItem("notes");
const savedIcons = document.querySelectorAll(".ri-delete-bin-line");

savedIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.parentElement.remove();
    updateStorage();
  });
});
createBtn.addEventListener("click", () => {
  let noteWrapper = document.createElement("div");
  noteWrapper.className = "note-wrapper";
  let colors = document.createElement("div");
  colors.className = "colors";
  colors.innerHTML = `
<div class="color darkAmber"></div>
<div class="color deepBlue"></div>
<div class="color EmeraldGreen"></div>
<div class="color purpleIndigo"></div>
`;
  noteWrapper.appendChild(colors);
  const colorButtons = noteWrapper.querySelectorAll(".color");
  colorButtons.forEach((color) => {
    color.addEventListener("click", () => {
      noteWrapper.style.background = getComputedStyle(color).backgroundColor;
      console.log(color);
      console.log(getComputedStyle(color).backgroundColor);
      updateStorage();
    });
  });

  let note = document.createElement("p");
  note.setAttribute("contenteditable", "true");
  noteWrapper.appendChild(note);
  note.innerText = "Type here...";
  note.addEventListener("focus", function () {
    if (note.innerText === "Type here...") {
      note.innerText = "";
    }
  });
  note.addEventListener("input", function () {
    let oldTime = noteWrapper.querySelector("span");
    if (oldTime) {
      oldTime.remove();
    }
    updateStorage();
  });
  note.addEventListener("blur", () => {
    if (note.innerText === "") {
      noteWrapper.remove();
      updateStorage();
    } else {
      let d = new Date();

      let day = d.getDate();
      let month = d.getMonth() + 1;
      let year = d.getFullYear();

      if (day < 10) day = "0" + day;
      if (month < 10) month = "0" + month;

      let formattedDate = `${day}/${month}/${year}`;

      let time = d.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      let timeDiv = document.createElement("span");
      timeDiv.innerText = `${formattedDate} ${time}`;

      noteWrapper.appendChild(timeDiv);
      updateStorage();
    }
  });

  let delIcon = document.createElement("i");
  delIcon.className = "ri-delete-bin-line";
  noteWrapper.appendChild(delIcon);
  notesContainer.appendChild(noteWrapper);
  updateStorage();
  delIcon.addEventListener("click", () => {
    noteWrapper.remove();
    updateStorage();
    console.log("delete");
  });
});

function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}
