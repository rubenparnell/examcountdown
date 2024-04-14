const menuBtn = document.getElementById('open-menu-btn');
const buttons = document.getElementById('buttons');
const sideMenu = document.getElementById('side-menu');
const spacing = document.getElementById('spacing');

function handleScroll() {
    const isLargeScreen = window.matchMedia("(min-width: 1291px)").matches;
    const isMediumScreen = window.matchMedia("(max-width: 1290px)").matches;
    const isSmallScreen = window.matchMedia("(max-width: 536px)").matches;

    let spacingPadding = isSmallScreen ? "30px" : isMediumScreen ? "10px" : "0px";
    spacing.style.padding = spacingPadding;

    const scrollPosition = parseInt(window.scrollY || document.body.scrollTop || document.documentElement.scrollTop);

    let threshold;
    if (isSmallScreen) {
    threshold = 113;
    } else if (isMediumScreen) {
    threshold = 63;
    } else if (isLargeScreen) {
    threshold = 0;
    }
    
    sideMenu.classList.add('no-transition');

    menuBtn.style.top = Math.max(20, threshold - scrollPosition) + 'px';
    buttons.style.top = Math.max(20, threshold - scrollPosition) + 'px';
    sideMenu.style.top = Math.max(20, threshold - scrollPosition) + 'px';

    setTimeout(() => {
    sideMenu.classList.remove('no-transition');
    }, 0);
}

handleScroll()

window.addEventListener('scroll', handleScroll);
window.addEventListener('touchmove', handleScroll);
