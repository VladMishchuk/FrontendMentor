///////////////////////////////////////////////////////////////////////////////////
//////////get data from JSON file//////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
fetch("json/data.json")
  .then((response) => response.json())
  .then((data) => {
    ////////////////////////////////////////////////////////////////////////////////
    ///////////////tab navigation///////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    const tabList = document.querySelector('[role="tablist"]');
    const tabs = tabList.querySelectorAll('[role="tab"]');

    tabList.addEventListener("keydown", changeTabFocus);

    tabs.forEach((tab) => {
      tab.addEventListener("click", changeTabPanel);
    });

    let tabFocus = 0;
    function changeTabFocus(e) {
      const keydownLeft = 37;
      const keydownRight = 39;

      if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);
      }

      if (e.keyCode === keydownRight) {
        tabFocus++;
        if (tabFocus >= tabs.length) {
          tabFocus = 0;
        }
      }

      if (e.keyCode === keydownLeft) {
        tabFocus--;
        if (tabFocus < 0) {
          tabFocus = tabs.length - 1;
        }
      }

      tabs[tabFocus].setAttribute("tabindex", 0);
      tabs[tabFocus].focus();
    }

    function changeTabPanel(e) {
      const targetTab = e.target;

      const tabContainer = targetTab.parentNode;

      tabContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", false);

      targetTab.setAttribute("aria-selected", true);
      ////////////////////////////////////////////////////////////////////////////////
      ///////////paste the right content on page from JSON////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      selectedTab = tabContainer.querySelector(
        '[aria-selected="true"]'
      ).textContent;

      function pasteContent(selectedTab) {
        let i =
          selectedTab === "Moon"
            ? 0
            : selectedTab === "Mars"
            ? 1
            : selectedTab === "Europa"
            ? 2
            : selectedTab === "Titan"
            ? 3
            : 0;

        document.getElementById("name").textContent = data.destinations[i].name;
        document.getElementById("description").textContent =
          data.destinations[i].description;
        document
          .querySelector("source")
          .setAttribute("srcset", data.destinations[i].images.webp);
        document
          .querySelectorAll("img")[1]
          .setAttribute("src", data.destinations[i].images.png);
        document.getElementById("distance").textContent =
          data.destinations[i].distance;
        document.getElementById("travel").textContent =
          data.destinations[i].travel;
      }
      pasteContent(selectedTab);
    }
  });
