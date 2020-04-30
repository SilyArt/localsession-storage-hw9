const clearStorageButton = document.querySelector(".clear");
const emptyStorageButton = document.querySelector(".empty");
const storageQuotaMsg = document.getElementById("storage-quota-msg");
const saveTextButton = document.getElementById("save-text");
const downloadLink = document.getElementById("save");
const textField = document.getElementById("textArea");

function sessionStorageToFile() {
  const text = sessionStorage["autosave"];
  console.log(text);
  const blob = new Blob([text], { type: "text/plain" });

  if (window.URL !== null) {
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = "storage.txt"
    downloadLink.target = '_blank';
  } else {
    downloadLink.window.URL.createObjectURL(blob);
    downloadLink.target = '_blank';
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink.download);
  }
}

function sessionStorageSupport() {
  return typeof Storage !== "undefined";
}

function sessionStorageAndQuota() {
  if (!sessionStorageSupport()) {
    storageQuotaMsg.innerHTML = "Sorry. No HTML5 session storage support here.";
  } else {
    try {
      sessionStorage.setItem("autosave", textField.value);
    } catch (error) {
      if (
        error.name === "QUOTA_EXCEEDED_ERR" ||
        error.name === "NS_ERROR_DOM_QUOTA_REACHED"
      ) {
        storageQuotaMsg.innerHTML = "Session Storage Quota Exceeded!";
      }
    }
  }
}
function clearStorage() {
  textField.value = "";
  sessionStorage.removeItem("autosave", textField.value);
}

function emptyStorage() {
  textField.value = "";
  sessionStorage.clear();
}

clearStorageButton.addEventListener("click", clearStorage);
emptyStorageButton.addEventListener("click", emptyStorage);
saveTextButton.addEventListener("click", sessionStorageAndQuota);

textField.addEventListener("input", sessionStorageAndQuota);

downloadLink.addEventListener("click", sessionStorageToFile);