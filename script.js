const nav = document.getElementById("mainNav");

const views = document.querySelectorAll(".view");

const navBtns = () =>
  document.querySelectorAll("#mainNav button");


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

  if (name === "home") {
    renderRecent();
  }

  if (name === "profile") {
    showAccountName();
  }
}


document.getElementById("mainNav").addEventListener("click", (event) => {

  const button = event.target.closest(
    "button[data-view]"
  );

  if (button) {
    showView(button.dataset.view);
  }

});


function toast(message) {

  const toastBox = document.getElementById("toast");

  toastBox.textContent = message;

  toastBox.classList.add("show");

  clearTimeout(toastBox._timer);

  toastBox._timer = setTimeout(() => {
    toastBox.classList.remove("show");
  }, 2200);
}


const ACCENTS = {
  orange: { main: "#ff7a1a", dark: "#d9600a" },
  blue:   { main: "#3b82f6", dark: "#1d4ed8" },
  green:  { main: "#22c55e", dark: "#15803d" },
  purple: { main: "#a855f7", dark: "#7e22ce" }
};

const themeToggleBtn = document.getElementById("themeToggleBtn");
const accentSwatches = document.getElementById("accentSwatches");

function applyTheme(mode) {

  document.documentElement.classList.toggle("light-theme", mode === "light");

  themeToggleBtn.classList.toggle("is-light", mode === "light");

  localStorage.setItem("drophub-theme", mode);
}

function applyAccent(name) {

  const accent = ACCENTS[name] || ACCENTS.orange;

  document.documentElement.style.setProperty("--orange", accent.main);
  document.documentElement.style.setProperty("--orange-dark", accent.dark);

  accentSwatches.querySelectorAll(".swatch").forEach((swatch) => {
    swatch.classList.toggle("active", swatch.dataset.accent === name);
  });

  localStorage.setItem("drophub-accent", name);
}

applyTheme(localStorage.getItem("drophub-theme") || "dark");
applyAccent(localStorage.getItem("drophub-accent") || "orange");

themeToggleBtn.addEventListener("click", () => {

  const isLight = document.documentElement.classList.contains("light-theme");

  applyTheme(isLight ? "dark" : "light");

  toast(isLight ? "Switched to dark mode" : "Switched to light mode");
});

accentSwatches.addEventListener("click", (event) => {

  const swatch = event.target.closest(".swatch");

  if (!swatch) return;

  applyAccent(swatch.dataset.accent);

  toast(`Accent color set to ${swatch.dataset.accent}`);
});

document.getElementById("resetSettingsBtn").addEventListener("click", () => {

  applyTheme("dark");
  applyAccent("orange");

  queued = [];
  renderFiles();

  localStorage.removeItem("drophub-toggles");
  drawToggles();
  renderRecent();

  toast("Settings reset to default");
});


/*
  IMPORTANT: replace "YOUR_GOOGLE_CLIENT_ID" below with your own Client ID
  from Google Cloud Console (APIs & Services > Credentials > OAuth client ID,
  type "Web application"). You also have to add your site's URL
  (your GitHub Pages link, and http://localhost:PORT for local testing)
  under "Authorized JavaScript origins" for the button to work.
  It will NOT work opened directly as a file:// path — you need to run it
  through a local server or the live site.
*/

window.addEventListener("load", () => {

  if (typeof google === "undefined") return;

  google.accounts.id.initialize({
    client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
    callback: handleGoogleLogin
  });

  google.accounts.id.renderButton(
    document.getElementById("googleSignInDiv"),
    { theme: "outline", size: "large", width: 280 }
  );

});


function parseJwt(token) {

  const base64Url = token.split(".")[1];

  const base64 = base64Url
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload);
}


function handleGoogleLogin(response) {

  const payload = parseJwt(response.credential);

  localStorage.setItem("drophub-account", payload.email);

  document.getElementById("loginErr").textContent = "";

  document.getElementById("loginView").style.display = "none";

  nav.style.display = "flex";

  showView("home");

  toast(`Signed in as ${payload.email}`);
}


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

  document.getElementById("loginView").style.display = "none";

  nav.style.display = "flex";

  localStorage.setItem("drophub-account", username);

  showView("home");

  toast("Connected to local hub");
});


document.getElementById("goToStorageBtn")
  .addEventListener("click", () => {
    showView("storage");
  });


const dropZone =
  document.getElementById("dropZone");

const fileInput =
  document.getElementById("fileInput");

const fileList =
  document.getElementById("fileList");

const emptyMsg =
  document.getElementById("emptyMsg");

const fileSummary =
  document.getElementById("fileSummary");

const progressBar =
  document.getElementById("progressBar");

const recentList =
  document.getElementById("recentList");

const recentEmpty =
  document.getElementById("recentEmpty");


let queued = [];


const TOGGLE_DEFAULTS = {
  notifyUpload: true,
  notifyNew: true,
  notifySound: false,
  capDrag: true,
  capMulti: true,
  capRecent: true,
  permView: true,
  permUpload: false,
  permDownload: true,
  privShowName: true,
  privShowTimes: true,
  privSaveHistory: true
};


function getToggles() {

  try {
    return Object.assign(
      {},
      TOGGLE_DEFAULTS,
      JSON.parse(localStorage.getItem("drophub-toggles")) || {}
    );
  } catch (error) {
    return Object.assign({}, TOGGLE_DEFAULTS);
  }
}


function getToggle(name) {

  return getToggles()[name];
}


function drawToggles() {

  const toggles = getToggles();

  document.querySelectorAll("[data-setting]").forEach((button) => {
    button.classList.toggle("is-on", toggles[button.dataset.setting]);
  });
}


document.addEventListener("click", (event) => {

  const button = event.target.closest("[data-setting]");

  if (!button) return;

  const toggles = getToggles();

  const name = button.dataset.setting;

  toggles[name] = !toggles[name];

  localStorage.setItem("drophub-toggles", JSON.stringify(toggles));

  drawToggles();

  renderRecent();

  toast(toggles[name] ? "Setting turned on" : "Setting turned off");
});


function addFiles(list) {

  let files = Array.from(list);

  if (!getToggle("capMulti")) {
    files = files.slice(0, 1);
  }

  queued.push(...files);

  renderFiles();
}


function showAccountName() {

  document.getElementById("currentAccount").textContent =
    localStorage.getItem("drophub-account") || "Guest";

  document.getElementById("accountNameInput").value = "";
}


document.getElementById("saveNameBtn").addEventListener("click", () => {

  const newName =
    document.getElementById("accountNameInput").value.trim();

  if (!newName) {

    toast("Enter a new account name");

    return;
  }

  localStorage.setItem("drophub-account", newName);

  showAccountName();

  toast("Account name updated");
});


document.getElementById("savePasswordBtn").addEventListener("click", () => {

  const current = document.getElementById("currentPassInput");

  const newPass = document.getElementById("newPassInput");

  const confirmPass = document.getElementById("confirmPassInput");

  const error = document.getElementById("passwordErr");

  if (!current.value || !newPass.value || !confirmPass.value) {

    error.textContent = "Fill in all three boxes.";

    return;
  }

  if (newPass.value.length < 6) {

    error.textContent = "New password must be at least 6 characters.";

    return;
  }

  if (newPass.value !== confirmPass.value) {

    error.textContent = "New passwords do not match.";

    return;
  }

  error.textContent = "";

  current.value = "";
  newPass.value = "";
  confirmPass.value = "";

  toast("Password changed");
});


document.getElementById("clearHistoryBtn").addEventListener("click", () => {

  localStorage.removeItem("drophub-uploads");

  clearFiles();

  renderRecent();

  toast("Upload history cleared");
});


function getLinked() {

  try {
    return JSON.parse(localStorage.getItem("drophub-linked")) || {};
  } catch (error) {
    return {};
  }
}


function drawLinked() {

  const linked = getLinked();

  document.querySelectorAll(".linked-row").forEach((row) => {

    const isLinked = Boolean(linked[row.dataset.provider]);

    row.classList.toggle("is-linked", isLinked);

    row.querySelector(".link-status").textContent =
      isLinked ? "Linked" : "Not linked";

    row.querySelector(".link-btn").textContent =
      isLinked ? "Unlink" : "Link";
  });
}


document.getElementById("linkedList").addEventListener("click", (event) => {

  const button = event.target.closest(".link-btn");

  if (!button) return;

  const row = button.closest(".linked-row");

  const provider = row.dataset.provider;

  const linked = getLinked();

  linked[provider] = !linked[provider];

  localStorage.setItem("drophub-linked", JSON.stringify(linked));

  drawLinked();

  toast(linked[provider] ? `Linked ${provider}` : `Unlinked ${provider}`);
});


function getUploads() {

  try {
    return JSON.parse(localStorage.getItem("drophub-uploads")) || [];
  } catch (error) {
    return [];
  }
}


function saveUploads(uploads) {

  localStorage.setItem("drophub-uploads", JSON.stringify(uploads));
}


function openDb() {

  return new Promise((resolve, reject) => {

    const request = indexedDB.open("drophub-files", 1);

    request.onupgradeneeded = () => {
      request.result.createObjectStore("files", { keyPath: "id" });
    };

    request.onsuccess = () => resolve(request.result);

    request.onerror = () => reject(request.error);
  });
}


async function saveFile(id, file) {

  try {

    const db = await openDb();

    db.transaction("files", "readwrite")
      .objectStore("files")
      .put({ id: id, blob: file });

  } catch (error) {

    toast("Could not save file data");
  }
}


async function getFile(id) {

  const db = await openDb();

  return new Promise((resolve, reject) => {

    const request = db.transaction("files")
      .objectStore("files")
      .get(id);

    request.onsuccess = () => {
      resolve(request.result ? request.result.blob : null);
    };

    request.onerror = () => reject(request.error);
  });
}


async function clearFiles() {

  try {

    const db = await openDb();

    db.transaction("files", "readwrite")
      .objectStore("files")
      .clear();

  } catch (error) {

    toast("Could not clear file data");
  }
}


async function downloadFile(item) {

  if (!getToggle("permDownload")) {

    toast("Downloads are turned off in Settings");

    return;
  }

  if (!item.id) {

    toast("This file was uploaded before downloads were added");

    return;
  }

  try {

    const blob = await getFile(item.id);

    if (!blob) {

      toast("File data not found on this device");

      return;
    }

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = item.name;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

    toast("Downloading " + item.name);

  } catch (error) {

    toast("Download failed");
  }
}


async function copyFile(item) {

  try {

    const isText =
      (item.type || "").startsWith("text/") ||
      item.type === "application/json" ||
      item.name.endsWith(".md") ||
      item.name.endsWith(".js");

    if (isText && item.id) {

      const blob = await getFile(item.id);

      if (blob) {

        await navigator.clipboard.writeText(await blob.text());

        toast("Copied the contents of " + item.name);

        return;
      }
    }

    await navigator.clipboard.writeText(item.name);

    toast("Copied the file name " + item.name);

  } catch (error) {

    toast("Copy failed");
  }
}


function makeIconButton(symbol, title) {

  const button = document.createElement("button");

  button.className = "icon-btn";

  button.textContent = symbol;

  button.title = title;

  button.setAttribute("aria-label", title);

  return button;
}


function formatSize(bytes) {

  const kb = bytes / 1024;

  if (kb > 1024) {
    return (kb / 1024).toFixed(1) + " MB";
  }

  return kb.toFixed(1) + " KB";
}


function timeAgo(time) {

  const minutes = Math.floor((Date.now() - time) / 60000);

  if (minutes < 1) {
    return "just now";
  }

  if (minutes < 60) {
    return minutes + (minutes === 1 ? " min ago" : " mins ago");
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return hours + (hours === 1 ? " hour ago" : " hours ago");
  }

  const days = Math.floor(hours / 24);

  return days + (days === 1 ? " day ago" : " days ago");
}


function renderRecent() {

  const uploads = getUploads();

  document.querySelector(".recent-block").style.display =
    getToggle("capRecent") ? "block" : "none";

  recentList.innerHTML = "";

  recentEmpty.style.display =
    uploads.length ? "none" : "block";

  uploads.slice().reverse().slice(0, 10).forEach((item) => {

    const row = document.createElement("div");

    row.className = "recent-row";

    const name = document.createElement("span");

    name.className = "name";

    name.textContent = item.name;

    const meta = document.createElement("span");

    meta.className = "meta";

    if (getToggle("privShowTimes")) {

      meta.innerHTML =
        formatSize(item.size) + " · <span class=\"time\"></span>";

      meta.querySelector(".time").textContent = timeAgo(item.time);

    } else {

      meta.textContent = formatSize(item.size);
    }

    const actions = document.createElement("span");

    actions.className = "recent-actions";

    const downloadBtn = makeIconButton("⬇", "Download");

    downloadBtn.addEventListener("click", () => {
      downloadFile(item);
    });

    const copyBtn = makeIconButton("📋", "Copy");

    copyBtn.addEventListener("click", () => {
      copyFile(item);
    });

    actions.appendChild(downloadBtn);

    actions.appendChild(copyBtn);

    row.appendChild(name);

    row.appendChild(meta);

    row.appendChild(actions);

    recentList.appendChild(row);

  });
}


function renderFiles() {

  fileList.innerHTML = "";

  emptyMsg.style.display =
    queued.length ? "none" : "block";


  if (queued.length) {

    const totalBytes = queued.reduce(
      (sum, file) => sum + file.size,
      0
    );

    fileSummary.textContent =
      `${queued.length} file(s) queued — ${formatSize(totalBytes)} total`;

    fileSummary.style.display = "block";

  } else {

    fileSummary.textContent = "";
    fileSummary.style.display = "none";
  }


  queued.forEach((file, index) => {

    const row =
      document.createElement("div");

    row.className = "file-row";


    const kb =
      (file.size / 1024).toFixed(1);


    row.innerHTML =
      `<span class="name"></span>
       <span class="size">${kb} KB</span>`;

    row.querySelector(".name").textContent = file.name;


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


dropZone.addEventListener("click", () => {

  fileInput.click();

});


fileInput.addEventListener("change", () => {

  addFiles(fileInput.files);

  fileInput.value = "";

});


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

  if (!getToggle("capDrag")) {

    toast("Drag and drop is turned off in Settings");

    return;
  }

  addFiles(event.dataTransfer.files);

});


document.getElementById("clearAllBtn")
  .addEventListener("click", () => {

    if (!queued.length) {

      toast("Nothing to clear");

      return;
    }

    queued = [];

    renderFiles();

    toast("Cleared the queue");

  });


document.getElementById("uploadBtn")
  .addEventListener("click", () => {

    if (!queued.length) {

      toast("Nothing queued to upload");

      return;
    }

    const fileCount = queued.length;

    progressBar.style.transition = "none";
    progressBar.style.width = "0%";

    void progressBar.offsetWidth;

    progressBar.style.transition = "width 1s ease";
    progressBar.style.width = "100%";

    setTimeout(() => {

      if (getToggle("privSaveHistory")) {

        const uploads = getUploads();

        queued.forEach((file, index) => {

          const id = Date.now() + "-" + index;

          uploads.push({
            id: id,
            name: file.name,
            size: file.size,
            type: file.type,
            time: Date.now()
          });

          saveFile(id, file);
        });

        saveUploads(uploads);
      }

      if (getToggle("notifyUpload")) {
        toast(`Uploaded ${fileCount} file(s) to local hub`);
      }

      queued = [];

      renderFiles();

      renderRecent();

      setTimeout(() => {
        progressBar.style.transition = "none";
        progressBar.style.width = "0%";
      }, 400);

    }, 1000);

  });


setInterval(renderRecent, 30000);

renderFiles();

renderRecent();

drawToggles();

drawLinked();
