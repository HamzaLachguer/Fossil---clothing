export function headerFunction() {
  const menuBtn = document.querySelector(".menu");
  const navMenu = document.querySelector(".nav-menu");
  
  const subNavBtn = document.querySelector(".sub-nav-link");
  const dropIcon = subNavBtn.querySelector(".drop-icon");
  const subNav = document.querySelector(".sub-nav");
  
  subNavBtn.addEventListener("click", subMenuToggle)
  
  function subMenuToggle() {
    const isSubNavOpen = dropIcon.classList.toggle("close-drop-icon");
    subNav.classList.toggle("hide-sub-menu", isSubNavOpen);
  
    // aria attributes
  }
  
  menuBtn.addEventListener("click", () => {
    const isOpen = menuBtn.classList.toggle("close");
  
    navMenu.classList.toggle("close-nav", !isOpen);
  
    if (!subNav.classList.contains("hide-sub-menu")) {
      subMenuToggle()
    }
  
    // aria attributes
    subNavBtn.setAttribute("aria-expanded", isOpen);
    navMenu.setAttribute("aria-hidden", !isOpen);
  })
  
  subNavBtn.setAttribute("aria-label", "toggle navigation menu");
  subNavBtn.setAttribute("aria-expanded", "false");
  subNavBtn.setAttribute("aria-controls", "nav-menu");
  navMenu.setAttribute("aria-hidden", "true");
  navMenu.id = "nav-menu";
}
