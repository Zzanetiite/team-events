document.addEventListener('DOMContentLoaded', function () {
  const csrfToken = window.CSRF_TOKEN;
  const domain = window.DOMAIN;

  console.log('CSRF Token:', csrfToken);
  console.log('Domain:', domain);
});
