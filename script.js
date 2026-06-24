// Security: Only run on trusted origin
if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
  console.warn('Warning: This site should be served over HTTPS');
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    document.body.classList.add('loaded');

    const sections = document.querySelectorAll('.section');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          // Use classList API instead of direct manipulation to prevent XSS
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        });
      }, {
        threshold: 0.15,
      });

      sections.forEach(section => observer.observe(section));
    } else {
      // Fallback for browsers without IntersectionObserver
      sections.forEach(section => section.classList.add('visible'));
    }
  } catch (error) {
    console.error('Error initializing page:', error);
    // Ensure page is still functional even if JS fails
    document.querySelectorAll('.section').forEach(section => {
      section.classList.add('visible');
    });
  }
});
