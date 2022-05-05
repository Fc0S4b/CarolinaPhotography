const date = document.querySelector('#date');
const switchBtn = document.querySelector('.switch');
const upBtn = document.querySelector('.fa-angle-up');
const downBtn = document.querySelector('.fa-angle-down');
const links = document.querySelector('.links');

// date
date.innerHTML = new Date().getFullYear();

// switch btn
switchBtn.addEventListener('click', () => {
  links.classList.toggle('hide-links');
  if (upBtn.classList.contains('showBtn')) {
    upBtn.classList.remove('showBtn');
    downBtn.classList.add('showBtn');
  } else {
    upBtn.classList.add('showBtn');
    downBtn.classList.remove('showBtn');
  }
});

// smooth scroll
const navbar = document.querySelector('.navbar');
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    links.classList.add('hide-links');

    const id = e.target.getAttribute('href').slice(1);
    const element = document.getElementById(id);
    const navHeight = navbar.getBoundingClientRect().height;
    let position = element.offsetTop - navHeight;

    window.scrollTo({
      left: 0,
      top: position,
      behavior: 'smooth',
    });
  });
});
