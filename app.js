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

//modal gallery

function Gallery(element) {
  this.container = element;
  this.list = [...element.querySelectorAll('.gallery-img')];
  this.modal = document.querySelector('.modal');
  this.modalImg = document.querySelector('.main-img');
  this.imageName = document.querySelector('.image-name');
  this.modalImages = document.querySelector('.modal-images');
  this.closeBtn = document.querySelector('.close-btn');
  this.nextBtn = document.querySelector('.next-btn');
  this.prevBtn = document.querySelector('.prev-btn');
  this.closeModal = this.closeModal.bind(this);
  this.nextImage = this.nextImage.bind(this);
  this.prevImage = this.prevImage.bind(this);
  this.chooseImage = this.chooseImage.bind(this);

  this.container.addEventListener(
    'click',
    function (e) {
      if (e.target.classList.contains('gallery-img')) {
        this.openModal(e.target, this.list);
      }
    }.bind(this)
  );
}

Gallery.prototype.openModal = function (selectedImage, list) {
  this.setMainImage(selectedImage);
  this.modalImages.innerHTML = list
    .map(function (image) {
      return `<img src="${
        image.src
      }" title="${image.title}" data-id="${image.dataset.id}" class="${selectedImage.dataset.id === image.dataset.id ? 'modal-img selected' : 'modal-img'}"/>`;
    })
    .join('');
  this.modal.classList.add('open');
  this.closeBtn.addEventListener('click', this.closeModal);
  this.modal.addEventListener(
    'click',
    function (e) {
      if (e.target.classList.contains('open')) {
        this.closeModal();
      }
    }.bind(this)
  );
  this.nextBtn.addEventListener('click', this.nextImage);
  this.prevBtn.addEventListener('click', this.prevImage);
  this.modalImages.addEventListener('click', this.chooseImage);
};

Gallery.prototype.setMainImage = function (selectedImage) {
  this.modalImg.src = selectedImage.src;
  this.imageName.textContent = selectedImage.title;
};

Gallery.prototype.closeModal = function () {
  this.modal.classList.remove('open');
  this.closeBtn.removeEventListener('click', this.closeModal);
  this.nextBtn.removeEventListener('click', this.nextImage);
  this.prevBtn.removeEventListener('click', this.prevImage);
  this.modalImages.removeEventListener('click', this.chooseImage);
};

Gallery.prototype.nextImage = function () {
  const selected = this.modalImages.querySelector('.selected');
  const next =
    selected.nextElementSibling || this.modalImages.firstElementChild;
  selected.classList.remove('selected');
  next.classList.add('selected');
  this.setMainImage(next);
};

Gallery.prototype.prevImage = function () {
  const selected = this.modalImages.querySelector('.selected');
  const prev =
    selected.previousElementSibling || this.modalImages.lastElementChild;
  selected.classList.remove('selected');
  prev.classList.add('selected');
  this.setMainImage(prev);
};
Gallery.prototype.chooseImage = function (e) {
  if (e.target.classList.contains('modal-img')) {
    const selected = this.modalImages.querySelector('.selected');
    selected.classList.remove('selected');
    this.setMainImage(e.target);
    e.target.classList.add('selected');
  }
};
const modal = new Gallery(document.querySelector('.gallery-center'));
