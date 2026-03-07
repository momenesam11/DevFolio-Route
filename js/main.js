document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.navbar');

  // Add scrolled class based on scroll position
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });

  // Check initial scroll position on page load
  if (window.scrollY > 50) {
    navbar.classList.add('navbar-scrolled');
  }

  // Smooth appear animation for sections when scrolling
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of the section is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  // Apply animation classes and observe all sections
  const sectionsToAnimate = document.querySelectorAll('section');
  sectionsToAnimate.forEach(section => {
    section.classList.add('animate-on-scroll');
    observer.observe(section);
  });

  // Number Counter Animation
  const numberSection = document.querySelector('section.numbers');
  const numberElements = document.querySelectorAll('section.numbers h2');
  let animationStarted = false;

  const numObserverOptions = {
    root: null,
    rootMargin: '0px', // no margin
    threshold: 0.5 // trigger when 50% is visible
  };

  const startCount = (el) => {
    let goal = parseInt(el.getAttribute('data-target'));
    let current = 0;

    // Choose an increment so that all animations complete in about 2 seconds (100 frames at 20ms)
    let increment = Math.ceil(goal / 100);
    if (increment < 1) increment = 1;

    let countInterval = setInterval(() => {
      current += increment;
      if (current >= goal) {
        el.textContent = goal;
        clearInterval(countInterval);
      } else {
        el.textContent = current;
      }
    }, 20);
  };

  if (numberSection && numberElements.length > 0) {
    // Preserve initial values as data attribute
    numberElements.forEach((el) => {
      let target = parseInt(el.textContent);
      el.setAttribute('data-target', target);
      el.textContent = '0';
    });

    const numObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animationStarted) {
          animationStarted = true;
          numberElements.forEach((num) => startCount(num));
        }
      });
    }, numObserverOptions);

    numObserver.observe(numberSection);
  }
});
