// Wait for the popup DOM to load before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
  const fetchButton = document.getElementById("click");
  const resultDiv = document.getElementById("result");

  fetchButton.addEventListener("click", async () => {
    try {
      // Get the current active tab
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      // Inject a function into the current tab to get the page title
      const result = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          // This function runs in the WEB PAGE context, so it can access `document`
          return document.URL; // Return the page weblink
        },
      });

      // Extract the title from the result and display it
      const pageTitle = result[0].result;
      resultDiv.textContent = pageTitle;
    } catch (error) {
      resultDiv.textContent = `Error: ${error.message}`;
      console.error("Error fetching title:", error);
    }
  });
});
