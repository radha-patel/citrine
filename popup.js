// Initialize button with user's preferred color
let lighterShade = document.getElementById("lightButton");

chrome.storage.sync.get("color", ({ color }) => {
    lightButton.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
lightButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: lightenPageBackground,
    });
});

darkButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: darkenPageBackground,
    });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}

function lightenPageBackground() {
    document.body.style.backgroundColor = "hsl(40, 900%, 90%, 0.5)";
}

function darkenPageBackground() {
    document.body.style.backgroundColor = "hsl(40, 900%, 90%, 1)";
}