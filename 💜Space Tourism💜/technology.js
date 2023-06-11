fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
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

      selectedTab = tabContainer
        .querySelector('[aria-selected="true"]')
        .querySelector("span").textContent;

      document.querySelectorAll("h1")[1].textContent =
        data.technology[parseInt(selectedTab) - 1].name;
      document.querySelector("p").textContent =
        data.technology[parseInt(selectedTab) - 1].description;

      let img = document.querySelector("picture").querySelector("img");
      let mediaQuery = window.matchMedia("(min-width: 45em)");

      function handleViewportChange(event) {
        if (event.matches) {
          img.src = img.src.replace("landscape", "portrait");
          console.log("1");
        } else {
          img.src = img.src.replace("portrait", "landscape");
          console.log("2");
        }
      }
      mediaQuery.addListener(handleViewportChange);

      document
        .querySelectorAll("img")[1]
        .setAttribute(
          "src",
          data.technology[parseInt(selectedTab) - 1].images.portrait
        );
      handleViewportChange(mediaQuery);
    }
  });
