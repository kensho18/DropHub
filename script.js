const nav = document.getElementById("mainNav");

const views = document.querySelectorAll(".view");

const navBtns = () =>
  document.querySelectorAll("#mainNav button");


/* CHANGE PAGE */

function showView(name) {

  views.forEach((view) => {
    view.classList.toggle(
      "active",
      view.id === "view-" + name
    );
  });

  navBtns().forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.view === name
    );
  });
}


/* NAVIGATION */

document.getElementById("mainNav").addEventListener("click", (event) => {

  const button = event.target.closest(
    "button[data-view]"
  );

  if (button) {
    showView(button.dataset.view);
  }

});


/* TOAST MESSAGE */

function toast(message) {

  const toastBox = document.getElementById("toast");

  toastBox.textContent = message;

  toastBox.classList.add("show");

  clearTimeout(toastBox._timer);

  toastBox._timer = setTimeout(() => {
    toastBox.classList.remove("show");
  }, 2200);
}


/* LOGIN */

document.getElementById("connectBtn").addEventListener("click", () => {

  const username =
    document.getElementById("userField").value.trim();

  const password =
    document.getElementById("passField").value.trim();

  const error =
    document.getElementById("loginErr");


  if (!username || !password) {

    error.textContent =
      "Enter a username and password to connect.";

    return;
  }


  error.textContent = "";

  document.getElementById("brandLabel").textContent =
    "DropHub";

  document.getElementById("loginView").style.display = "none";

  nav.style.display = "flex";

  showView("home");

  toast("Connected to local hub");
});


/* STORAGE MANAGER */

const dropZone =
  document.getElementById("dropZone");

const fileInput =
  document.getElementById("fileInput");

const fileList =
  document.getElementById("fileList");

const emptyMsg =
  document.getElementById("emptyMsg");


let queued = [];


/* SHOW FILES */

function renderFiles() {

  fileList.innerHTML = "";

  emptyMsg.style.display =
    queued.length ? "none" : "block";


  queued.forEach((file, index) => {

    const row =
      document.createElement("div");

    row.className = "file-row";


    const kb =
      (file.size / 1024).toFixed(1);


    row.innerHTML =
      `<span class="name">${file.name}</span>
       <span class="size">${kb} KB</span>`;


    const removeButton =
      document.createElement("button");

    removeButton.textContent = "✕";

    removeButton.title = "Remove";


    removeButton.addEventListener("click", () => {

      queued.splice(index, 1);

      renderFiles();

    });


    row.appendChild(removeButton);

    fileList.appendChild(row);

  });
}


/* CLICK TO SELECT FILE */

dropZone.addEventListener("click", () => {

  fileInput.click();

});


/* FILE SELECTED */

fileInput.addEventListener("change", () => {

  queued.push(
    ...Array.from(fileInput.files)
  );

  renderFiles();

  fileInput.value = "";

});


/* DRAG AND DROP */

["dragover", "dragenter"].forEach((eventName) => {

  dropZone.addEventListener(eventName, (event) => {

    event.preventDefault();

    dropZone.classList.add("drag");

  });

});


["dragleave", "drop"].forEach((eventName) => {

  dropZone.addEventListener(eventName, (event) => {

    event.preventDefault();

    dropZone.classList.remove("drag");

  });

});


dropZone.addEventListener("drop", (event) => {

  queued.push(
    ...Array.from(event.dataTransfer.files)
  );

  renderFiles();

});


/* UPLOAD */

document.getElementById("uploadBtn")
  .addEventListener("click", () => {

    if (!queued.length) {

      toast("Nothing queued to upload");

      return;
    }


    toast(
      `Uploaded ${queued.length} file(s) to local hub`
    );


    queued = [];

    renderFiles();

  });


/* ADMIN SETTINGS */

document.getElementById("saveConfigBtn")
  .addEventListener("click", () => {

    const max =
      document.getElementById("maxStorage").value;

    const subnet =
      document.getElementById("subnet").value;


    toast(
      `Saved: ${max} GB limit, subnet ${subnet}`
    );

  });


/* INITIAL FILE LIST */

renderFiles();
