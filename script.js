/**
 * Miguel Gárate O. Servicio Automotriz
 * Script Vanilla JS - Rápido, Ligero y Accesible
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Configuración centralizada de WhatsApp
  // Para cambiar el número en toda la página, solo actualiza esta variable:
  const WHATSAPP_CONFIG = {
    // [CONFIRMAR NÚMERO]: Reemplazar con el número real de WhatsApp de Miguel Gárate (ej: "56912345678")
    number: "569XXXXXXXX",
    displayNumber: "+56 9 XXXX XXXX"
  };

  // 2. Actualizar año en el footer automáticamente
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
  }

  // 3. Animación suave de aparición al hacer scroll (Intersection Observer)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
    elementsToReveal.forEach(el => revealObserver.observe(el));
  } else {
    // Si prefiere reducción de movimiento o no soporta IntersectionObserver, mostrar directamente
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.classList.add('is-visible');
    });
  }

  // 4. Acordeón FAQ: asegurar que solo uno permanezca abierto para mejor legibilidad móvil (opcional pero limpio)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.open) {
            otherItem.removeAttribute('open');
          }
        });
      }
    });
  });

  // 5. Soporte para enlaces internos con scroll suave respetando el header fijo
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 76;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });

  // 6. Registro de conversiones / clicks en WhatsApp
  document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-service') || 'General';
      if (window.gtag) {
        window.gtag('event', 'whatsapp_click', {
          service: serviceName
        });
      }
    });
  });
});
