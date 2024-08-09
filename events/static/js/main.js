document.addEventListener('DOMContentLoaded', function () {
  // Access environment variables from the window object
  const csrfToken = window.CSRF_TOKEN;
  const domain = window.DOMAIN;

  // Example usage of the environment variables
  console.log('CSRF Token:', csrfToken);
  console.log('Domain:', domain);
});
