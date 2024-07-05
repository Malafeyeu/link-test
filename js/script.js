const $ = window.jQuery;
const Mmenu = window.Mmenu;

// Объект конфигурации клиента
const ClientConfig = {
  phone: '+7 (800) 941-34-28',
  city: 'Санкт-Петербург',
};

$(document).ready(function() {

  const burger = document.querySelector('.site-header__burger-menu');
  const menu = new Mmenu( "#menu", {
    classNames: {
      vertical: "expand"
    },
    navbar: {
      add: false,
    },
    offCanvas: {
      position: "bottom",
      page: {
        selector: "#page",
      }
    },
    theme: "white",
  });
  const api = menu.API;
  
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    if (burger.classList.contains('active')) {
      api.open();
    } else {
      api.close();
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('#menu') && !event.target.closest('.site-header__burger-menu')) {
      api.close();
      burger.classList.remove('active');
    }
  });

  document.addEventListener("mmenu:closed", () => burger.classList.remove('active'));

// Функция для отображения данных клиента на странице
  function displayClientInfo(config) {
    const divElementLocation = document.querySelector('.block-info__location');
    const divElementPhone = document.querySelector('.block-info__phone');
    const divElementLocationMenu = document.querySelector('.menu-location');
    const divElementPhoneMenu = document.querySelector('.menu-call');

    const aElementLocation = document.createElement('a');
    aElementLocation.textContent = config.city;
    aElementLocation.href = 'https://yandex.ru/maps/?pt=30.31413,59.93863&z=12&l=map';
    divElementLocation.appendChild(aElementLocation);

    const aElementPhone = document.createElement('a');
    aElementPhone.textContent = config.phone;
    aElementPhone.href = 'tel: +7 (800) 941-34-28';
    divElementPhone.appendChild(aElementPhone);

    const aElementLocationMenu = document.createElement('a');
    aElementLocationMenu.textContent = config.city;
    aElementLocationMenu.href = 'https://yandex.ru/maps/?pt=30.31413,59.93863&z=12&l=map';
    divElementLocationMenu.appendChild(aElementLocationMenu);

    const aElementPhoneMenu = document.createElement('a');
    aElementPhoneMenu.textContent = config.phone;
    aElementPhoneMenu.href = 'tel: +7 (800) 941-34-28';
    divElementPhoneMenu.appendChild(aElementPhoneMenu);
  };

  displayClientInfo(ClientConfig);

  // Получаем текущий URL
  const currentUrl = window.location.href;
  const responseRegex = /\/response(?:\.html)?/;

  if (!responseRegex.test(currentUrl)) {
// Checkbox формы
  const checkbox = document.querySelector('.form__policy');
  checkbox.addEventListener('click', () => checkbox.classList.toggle('checked'));
// Form
  $('.form__btn-submit').on('click', () => {
    const form = $('.form');
    const name = $('#name').val();
    const phone = $('#phone').val();
    const isChecked = $(".policy-checkbox").hasClass("active");
    const divError = $("<div>");
  
    if (name.trim() == "") {
      $(".errorName").text("Имя");
      $("#name").addClass("error");
      return false;
    } else {
      $(".errorName").text("");
      $("#name").removeClass("error");
    }
  
    if (phone.trim() == "" || phone.length < 10) {
      $(".errorPhone").text("Введите номер телефона");
      $("#phone").addClass("error");
      return false;
    } else {
      $(".errorPhone").text("");
      $("#phone").removeClass("error");
    }
    
    if (isChecked) {
    
    }
  })
}
// Carousel
  const carouselBranding = $('.branding__carousel');
  const carouselTariff = $('.tariff__carousel');
  
  const getMargin = () => {
    var windowWidth = $(window).width();
    if (windowWidth < 321) {
      return 15;
    } else if (windowWidth < 769) {
      return 20;
    } else if (windowWidth < 1441) {
      return 29;
    } else {
      return 30;
    }
  }

  const initializeCarousel = () => {
    carouselTariff.owlCarousel({
      loop: true,
      margin: getMargin(),
      nav: true,
      dots: true,
      autoWidth: true,
      navContainer: '.tariff__navs',
      dotsContainer: '.tariff__dots',
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2
        },
        1000: {
          items: 4
        }
      },
      onInitialized: (event) => updateDots(3),
    });

    carouselBranding.owlCarousel({
      loop: true,
      margin: 5,
      nav: true,
      dots: true,
      items: 1,
      navContainer: '.branding__navs',
      dotsContainer: '.branding__dots',
    });
  };

  const updateDots = (count) => {
    const dots = $('.tariff__dots .owl-dot');
    dots.each(function(index) {
      if (index < count) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }

  const updateCarousel = () => {
    const newMargin = getMargin();
    carouselTariff.trigger('destroy.owl.carousel');
    carouselTariff.owlCarousel({
      loop: true,
      margin: newMargin,
      nav: true,
      dots: true,
      autoWidth: true,
      navContainer: '.tariff__navs',
      dotsContainer: '.tariff__dots',
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2
        },
        1000: {
          items: 4
        }
      },
      onInitialized: (event) => updateDots(3)
    });
  }

  initializeCarousel();

  // Обновляем карусель при изменении размера окна
  $(window).resize(() => updateCarousel())

  // Добавляем кастомные кнопки
  const addCustomBtn = () => {
    const elementButtonReviewsNext = $('.owl-next');
    const elementButtonReviewsPrev = $('.owl-prev');
    // Создаем элемент изображения
    const btnSvg = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 14L8 10L12 6" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    elementButtonReviewsNext.append(btnSvg);
    elementButtonReviewsPrev.append(btnSvg);
  };
  addCustomBtn();
});