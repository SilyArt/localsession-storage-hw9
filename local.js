const clearStorageButton = document.querySelector(".clear");
const emptyStorageButton = document.querySelector(".empty");
const storageQuotaMsg = document.getElementById("storage-quota-msg");
const saveTextButton = document.getElementById("save-text");
const downloadLink = document.getElementById("save");
const textField = document.getElementById("textArea");

function localStorageToFile() {
  const text = localStorage["autosave"];
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

function localStorageSupport() {
  return typeof Storage !== "undefined";
}

function localStorageAndQuota() {
  if (!localStorageSupport()) {
    storageQuotaMsg.innerHTML = "Sorry. No HTML5 local storage support here.";
  } else {
    try {
        localStorage.setItem("autosave", textField.value);
    } catch (error) {
      if (
        error.name === "QUOTA_EXCEEDED_ERR" ||
        error.name === "NS_ERROR_DOM_QUOTA_REACHED"
      ) {
        storageQuotaMsg.innerHTML = "Local Storage Quota Exceeded";
      }
    }
  }
}
function clearStorage() {
  textField.value = "";
  localStorage.removeItem("autosave", textField.value);
}

function emptyStorage() {
  textField.value = "";
  localStorage.clear();
}

clearStorageButton.addEventListener("click", clearStorage);
emptyStorageButton.addEventListener("click", emptyStorage);
saveTextButton.addEventListener("click", localStorageAndQuota);

textField.addEventListener("input", localStorageAndQuota);

downloadLink.addEventListener("click", localStorageToFile);