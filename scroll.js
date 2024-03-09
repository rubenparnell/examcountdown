const menuBtn = document.getElementById('open-menu-btn');
const timetableBtn = document.getElementById('timetable-btn');
const sideMenu = document.getElementById('side-menu');

function handleScroll() {
    const isPhoneScreen = window.matchMedia("(max-width: 600px)").matches;
    const scrollPosition = parseInt(window.scrollY || document.body.scrollTop || document.documentElement.scrollTop);
    console.log(scrollPosition);

    let threshold = isPhoneScreen ? 100 : 30;

    sideMenu.classList.add('no-transition');
    
    menuBtn.style.top = Math.max(20, threshold - scrollPosition) + 'px';
    timetableBtn.style.top = Math.max(20, threshold - scrollPosition) + 'px';
    sideMenu.style.top = Math.max(20, threshold - scrollPosition) + 'px';

    setTimeout(() => {
        sideMenu.classList.remove('no-transition');
    }, 0);
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('touchmove', handleScroll);
