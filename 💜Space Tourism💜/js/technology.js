///////////////////////////////////////////////////////////////////////////////////
//////////check viewport changes for place right image/////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
let img = document.querySelector("picture").querySelector("img");
let mediaQuery = window.matchMedia("(min-width: 45em)");

function handleViewportChange(event) {
  if (event.matches) {
    img.src = img.src.replace("landscape", "portrait");
  } else {
    img.src = img.src.replace("portrait", "landscape");
  }
}
mediaQuery.addListener(handleViewportChange);
handleViewportChange(mediaQuery);
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
      let targetTab = e.target;
      if (e.target.tagName == "SPAN") {
        targetTab = targetTab.parentNode;
      }
      const tabContainer = targetTab.parentNode;
      tabContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", false);

      targetTab.setAttribute("aria-selected", true);
      ////////////////////////////////////////////////////////////////////////////////
      ///////////paste the right content on page from JSON////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      selectedTab = tabContainer
        .querySelector('[aria-selected="true"]')
        .querySelector("span").textContent;

      document.querySelectorAll("h1")[1].textContent =
        data.technology[parseInt(selectedTab) - 1].name;
      document.querySelector("p").textContent =
        data.technology[parseInt(selectedTab) - 1].description;

      document
        .querySelectorAll("img")[1]
        .setAttribute(
          "src",
          data.technology[parseInt(selectedTab) - 1].images.portrait
        );
      handleViewportChange(mediaQuery);
    }
  });
