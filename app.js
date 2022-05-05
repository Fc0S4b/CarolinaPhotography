const date = document.querySelector('#date');
const switchBtn = document.querySelector('.switch');
const upBtn = document.querySelector('.fa-angle-up');
const downBtn = document.querySelector('.fa-angle-down');
const links = document.querySelector('.links');

date.innerHTML = new Date().getFullYear();

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
