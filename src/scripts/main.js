(function () {
  "use strict";

  // ########################## Preloader ##############################
  // window.addEventListener("load", (e) => {
  //   document.querySelector(".preloader").style.display = "none";
  // });

  // ####################### Testimonial Slider #########################
  new Swiper(".testimonial-slider", {
    spaceBetween: 24,
    loop: true,
    pagination: {
      el: ".testimonial-slider-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });

  // ########################## Tab ##########################
  function setActiveTab(tabGroup, tabName) {
    const tabsNav = tabGroup.querySelector("[data-tab-nav]");
    const tabsContent = tabGroup.querySelector("[data-tab-content]");

    tabsNav.querySelectorAll("[data-tab]").forEach((tabNavItem) => {
      tabNavItem.classList.remove("active");
    });
    tabsContent.querySelectorAll("[data-tab-panel]").forEach((tabPane) => {
      tabPane.classList.remove("active");
    });

    const selectedTabNavItem = tabsNav.querySelector(`[data-tab="${tabName}"]`);
    selectedTabNavItem.classList.add("active");
    const selectedTabPane = tabsContent.querySelector(
      `[data-tab-panel="${tabName}"]`,
    );
    selectedTabPane.classList.add("active");
  }
  const tabGroups = document.querySelectorAll("[data-tab-group]");
  tabGroups.forEach((tabGroup) => {
    const tabsNav = tabGroup.querySelector("[data-tab-nav]");
    const tabsNavItem = tabsNav.querySelectorAll("[data-tab]");
    const activeTabName = tabsNavItem[0].getAttribute("data-tab");

    setActiveTab(tabGroup, activeTabName);

    tabsNavItem.forEach((tabNavItem) => {
      tabNavItem.addEventListener("click", () => {
        const tabName = tabNavItem.dataset.tab;
        setActiveTab(tabGroup, tabName);
      });
    });
  });

  const tablist = document.querySelectorAll("[data-tab-nav] [data-tab]");
  function tabsHandler(event) {
    let index = Array.from(tablist).indexOf(this);
    let numbTabs = tablist.length;
    let nextId;
    if (numbTabs > 1) {
      if (event.key === "ArrowRight") {
        nextId = tablist[(index + 1) % numbTabs];
        if (index === numbTabs - 1) {
          nextId = tablist[0];
        }
        nextId.focus();
        nextId.click();
      }
      if (event.key === "ArrowLeft") {
        nextId = tablist[(index - 1 + numbTabs) % numbTabs];
        if (index === 0) {
          nextId = tablist[numbTabs - 1];
        }
        nextId.focus();
        nextId.click();
      }
    }
  }

  tablist.forEach(function (tab) {
    tab.addEventListener("keydown", tabsHandler);
  });

  // ########################## Accordion ##########################
  const accordion = document.querySelectorAll("[data-accordion]");
  accordion.forEach((header) => {
    header.addEventListener("click", () => {
      const accordionItem = header.parentElement;
      accordionItem.classList.toggle("active");
    });
  });

  // ########################## Modal ##############################
  const openModalButtons = document.querySelectorAll("[data-modal-open]");
  const closeModalButtons = document.querySelectorAll("[data-modal-close]");

  function openModal(modal) {
    if (modal === null) {
      return null;
    }
    const overlay = modal.querySelector("[data-modal-overlay]");
    modal.style.display = "block";
    overlay.style.display = "block";
  }

  function closeModal(modal) {
    if (modal === null) {
      return null;
    }
    const overlay = modal.querySelector("[data-modal-overlay]");
    modal.style.display = "none";
    overlay.style.display = "none";
  }

  openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.nextElementSibling;
      openModal(modal);
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest("[data-modal]");
      closeModal(modal);
    });
  });
})();

// nav issue
window.addEventListener("resize", () => {
  "use strict";
  if (window.innerWidth > 1024) {
    document.querySelector("#nav-menu").classList.add("lg:!flex");
  }
});

// ============ project gallery ==========
const galleryImages = [
  "/images/theme-details-1.png",
  "https://astrothemes.club/images/themes/bexer.png",
  "https://astrothemes.club/images/themes/dexler.png",
  "https://astrothemes.club/images/themes/thumbnails/agency-landing-page.webp",
];
const themeDetailsBannerImg = document.getElementById(
  "theme-details-banner-img",
);


const galleryImageShow = () => {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  galleryImages.forEach((image) => {
    gallery.innerHTML += ` 
            <div class="col-3">
              <img
                src="${image}"
                alt="theme talent"
                class="w-full h-24 sm:h-28 rounded-lg transition-transform duration-300 object-cover hover:scale-105 cursor-pointer ${themeDetailsBannerImg.src.replace(window.location.origin, "") === image ? "border-2 border-theme-light transform scale-105" : ""}"
                onclick="changeBannerImage('${image}')"
              />
            </div>`;
  });


};

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("theme-details")) {
    galleryImageShow();
    // ============ image zoom effect ==========
    const zoomBox = document.getElementById("zoom-box");
    zoomBox.addEventListener("mousemove", (e) => {
      const containerWidth = zoomBox.offsetWidth;
      const containerHeight = zoomBox.offsetHeight;
      const image = zoomBox.querySelector("img");
      const x = e.pageX - zoomBox.offsetLeft;
      const y = e.pageY - zoomBox.offsetTop;
      const translateX = (containerWidth / 2 - x) * 2;
      const translateY = (containerHeight / 2 - y) * 2;

      const scale = 2;

      image.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    });
    zoomBox.addEventListener("mouseleave", (e) => {
      const image = zoomBox.querySelector("img");
      image.style.transform = "translate(0%, 0%) scale(1)";
    });
  }
});

function changeBannerImage(image) {
  galleryImageShow();
  themeDetailsBannerImg.src = image;
}



// ============ image uploader ==========
function setupImageUploader(boxId, inputId) {
  const box = document.getElementById(boxId);
  const input = document.getElementById(inputId);

  box.addEventListener("click", function () {
    input.click();
  });

  input.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
       
        box.innerHTML = "";
        box.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("submit")) {
    setupImageUploader("image-upload-box", "image-input");
    setupImageUploader("image-upload-box-1", "image-input-1");
    setupImageUploader("image-upload-box-2", "image-input-2");
    setupImageUploader("image-upload-box-3", "image-input-3");
    setupImageUploader("image-upload-box-4", "image-input-4");
  }
 
});
