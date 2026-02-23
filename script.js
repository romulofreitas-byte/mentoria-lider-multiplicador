/* ============================================
   SCRIPT PRINCIPAL - FUNCIONALIDADES INTERATIVAS
   ============================================ */

// ===== CONFIGURAÇÕES =====
const EVENT_DATE = '15 Jan 2026';
const EVENT_TIME = '20h';
const PROGRESS_PERCENTAGE = 15; // 15% de progresso

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
  initVslPopup();
  initHeader();
  initDateAndTime();
  initProgressBar();
  initAccordions();
  initMagneticButtons();
  initScrollAnimations();
  initParallax();
  initCarrossel();
  initCookieBanner();
  initSmoothScroll();
  initDynamicBackgrounds();
  initHeroAnimations();
  initCheckout();
});

// ===== VSL POPUP - VIDEO SALES LETTER =====
function initVslPopup() {
  const overlay = document.getElementById('vslOverlay');
  const video = document.getElementById('vslVideo');
  const progressFill = document.getElementById('vslProgressFill');
  const unmuteBtn = document.getElementById('vslUnmuteBtn');
  const skipBtn = document.getElementById('vslSkipBtn');

  if (!overlay || !video || !progressFill) return;

  // Bloquear scroll da página enquanto o popup está aberto
  document.body.style.overflow = 'hidden';

  // Função para fechar o popup VSL
  function closeVslPopup() {
    if (overlay.classList.contains('closing')) return; // Evitar duplo clique
    video.pause();
    progressFill.style.width = '100%';
    overlay.classList.add('closing');
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = '';
    }, 800);
  }

  // Mostrar botão "Pular" após 3 segundos (fallback de segurança)
  setTimeout(() => {
    if (skipBtn && overlay.parentNode) {
      skipBtn.classList.add('visible');
    }
  }, 3000);

  // Botão de pular/fechar o popup
  if (skipBtn) {
    skipBtn.addEventListener('click', closeVslPopup);
  }

  // Função de easing não-linear para a barra de progresso
  // Avança rapidamente no início e desacelera no final
  function easeProgress(realProgress) {
    return Math.pow(realProgress, 0.4);
  }

  // Atualizar barra de progresso a cada timeupdate do vídeo
  video.addEventListener('timeupdate', () => {
    if (!video.duration || video.duration === 0) return;
    const realProgress = video.currentTime / video.duration;
    const visualProgress = easeProgress(realProgress) * 100;
    progressFill.style.width = `${Math.min(visualProgress, 100)}%`;
  });

  // Quando o vídeo terminar, fechar o popup
  video.addEventListener('ended', closeVslPopup);

  // Tentar autoplay com som
  video.muted = false;
  const playPromise = video.play();

  if (playPromise !== undefined) {
    playPromise.then(() => {
      // Autoplay com som funcionou
      unmuteBtn.style.display = 'none';
    }).catch(() => {
      // Autoplay com som bloqueado pelo browser - iniciar mutado
      video.muted = true;
      video.play().catch(() => {
        // Se mesmo mutado não funcionar, mostrar botão pular imediatamente
        if (skipBtn) skipBtn.classList.add('visible');
      });
      // Exibir botão de ativar som
      unmuteBtn.style.display = 'flex';
    });
  }

  // Botão de ativar som
  if (unmuteBtn) {
    unmuteBtn.addEventListener('click', () => {
      video.muted = false;
      unmuteBtn.style.display = 'none';
    });
  }
}

// ===== HEADER TECH - SCROLL BEHAVIOR E ANIMAÇÕES =====
function initHeader() {
  const header = document.querySelector('.header-tech');
  if (!header) return;
  
  // Animação de entrada do header
  setTimeout(() => {
    header.classList.add('visible');
  }, 100);
  
  // Scroll behavior - adicionar classe 'scrolled' quando usuário rola
  let lastScrollTop = 0;
  let ticking = false;
  
  function handleScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        ticking = false;
      });
      
      ticking = true;
    }
  }
  
  // Listener de scroll com throttling
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Verificar estado inicial
  handleScroll();
}

// ===== DATA E HORA =====
function initDateAndTime() {
  const dateElements = document.querySelectorAll('.event-date');
  const timeElements = document.querySelectorAll('.event-time');
  
  dateElements.forEach(el => {
    el.textContent = EVENT_DATE;
  });
  
  timeElements.forEach(el => {
    el.textContent = EVENT_TIME;
  });
}

// ===== BARRA DE PROGRESSO ANIMADA =====
function initProgressBar() {
  const progressBar = document.querySelector('.progress-bar');
  const progressText = document.querySelector('.progress-text');
  const progressPercentage = document.querySelector('.progress-percentage');
  
  if (!progressBar) return;
  
  // Inicializar em 0%
  progressBar.style.width = '0%';
  progressBar.setAttribute('data-progress', '0');
  
  if (progressPercentage) {
    progressPercentage.textContent = '0%';
  }
  
  // Animar após um pequeno delay para melhor efeito visual
  setTimeout(() => {
    // Adicionar classe para ativar shimmer
    progressBar.classList.add('animating');
    
    // Animar a largura de 0% para 15%
    progressBar.style.width = `${PROGRESS_PERCENTAGE}%`;
    progressBar.setAttribute('data-progress', PROGRESS_PERCENTAGE);
    
    // Animar o número de porcentagem simultaneamente
    if (progressPercentage) {
      animatePercentage(0, PROGRESS_PERCENTAGE, 1500, progressPercentage);
    }
    
    // Adicionar pulso suave após a animação
    setTimeout(() => {
      progressBar.classList.add('animated');
    }, 1500);
  }, 900); // Delay para aparecer junto com outros elementos do hero
}

// Função para animar o número da porcentagem
function animatePercentage(start, end, duration, element) {
  const startTime = performance.now();
  const difference = end - start;
  
  function updatePercentage(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function para suavizar a animação
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + difference * easeOutCubic);
    
    if (element) {
      element.textContent = `${current}%`;
    }
    
    if (progress < 1) {
      requestAnimationFrame(updatePercentage);
    } else {
      // Garantir que termine no valor exato
      if (element) {
        element.textContent = `${end}%`;
      }
    }
  }
  
  requestAnimationFrame(updatePercentage);
}

// ===== ESTRUTURA DA MENTORIA - INTERATIVA =====
function initAccordions() {
  const moduloCards = document.querySelectorAll('.modulo-card');
  const toggleButtons = document.querySelectorAll('.modulo-toggle');
  
  // Inicializar animação de scroll reveal
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger delay para cada card
        const delay = index * 150;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  moduloCards.forEach(card => {
    scrollObserver.observe(card);
  });
  
  // Toggle de cada módulo
  toggleButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const card = button.closest('.modulo-card');
      const isActive = card.classList.contains('active');
      
      // Opcional: fechar outros módulos ao abrir um novo (descomente se desejar)
      // if (!isActive) {
      //   moduloCards.forEach(otherCard => {
      //     if (otherCard !== card) {
      //       otherCard.classList.remove('active');
      //     }
      //   });
      // }
      
      // Toggle do módulo atual
      card.classList.toggle('active');
      
      // Scroll suave para o card expandido
      if (!isActive) {
        setTimeout(() => {
          const cardRect = card.getBoundingClientRect();
          const scrollPosition = window.scrollY + cardRect.top - 100;
          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
          });
        }, 300);
      }
    });
  });
  
  // Efeito magnetic suave nos cards de módulos
  moduloCards.forEach(card => {
    const content = card.querySelector('.modulo-content');
    
    if (content) {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.02;
        const moveY = y * 0.02;
        
        content.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        content.style.transform = '';
      });
    }
  });
  
  // Aplicar magnetic effect em cards de outras seções (exceto seções minimalistas: Para Quem É, Encontros Individuais e Conquistas)
  const allCards = document.querySelectorAll(`
    .beneficio-item,
    .bonus-feature
  `);
  
  allCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const moveX = x * 0.01;
      const moveY = y * 0.01;
      
      card.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ===== MAGNETIC BUTTONS MELHORADO =====
function initMagneticButtons() {
  const magneticButtons = document.querySelectorAll('.magnetic');
  const mentorItems = document.querySelectorAll('.mentor-item');
  const cards = document.querySelectorAll('.conquista-item, .beneficio-item, .bonus-feature');
  
  // Aplicar magnetic effect em botões (mais pronunciado)
  magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const moveX = x * 0.3;
      const moveY = y * 0.3;
      
      button.style.transform = `translate(${moveX}px, ${moveY}px)`;
      button.style.boxShadow = `0 ${12 + Math.abs(moveY) * 0.5}px ${36 + Math.abs(moveY) * 0.8}px rgba(255, 186, 73, 0.45),
                                 0 ${6 + Math.abs(moveY) * 0.3}px ${18 + Math.abs(moveY) * 0.5}px rgba(255, 186, 73, 0.3)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0)';
      button.style.boxShadow = '';
    });
  });
  
  // Aplicar magnetic effect em cards de mentores
  mentorItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const moveX = x * 0.05;
      const moveY = y * 0.05;
      
      item.style.transform = `translate(${moveX}px, ${moveY}px) translateY(-8px)`;
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translate(0, 0)';
    });
  });
  
  // Parallax suave em cards durante scroll será gerenciado separadamente
}

// ===== SCROLL ANIMATIONS (INTERSECTION OBSERVER APRIMORADO) =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  // Observer para seções header
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const delay = Math.min(index * 0.1, 0.6);
        entry.target.style.animationDelay = `${delay}s`;
        entry.target.classList.add('animate-fadeInUp');
        headerObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observer específico para Para Quem É - fade-in simples
  const paraQuemObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const item = entry.target;
        const index = parseInt(item.getAttribute('data-index')) || 0;
        const delay = (index - 1) * 0.1; // Delay menor e mais suave
        
        setTimeout(() => {
          item.classList.add('visible');
        }, delay * 1000);
        
        paraQuemObserver.unobserve(item);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });
  
  // Observer para cards com stagger delay (outras seções)
  const cardObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger delay baseado na posição no grid
        const delay = (index % 10) * 0.1; // Delay máximo de 1s
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay * 1000);
        cardObserver.unobserve(entry.target);
      }
    });
  }, cardObserverOptions);
  
  // Observer específico para Encontros Individuais - fade-in simultâneo
  const encontrosObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const item = entry.target;
        const delay = index * 0.08; // Delay pequeno entre items
        
        setTimeout(() => {
          item.classList.add('visible');
        }, delay * 1000);
        
        encontrosObserver.unobserve(item);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });
  
  // Observar items de Encontros Individuais
  const encontrosItems = document.querySelectorAll('.encontros-individuais-item');
  encontrosItems.forEach(item => {
    encontrosObserver.observe(item);
  });
  
  // Observar parágrafo diferencial
  const diferencialEl = document.querySelector('.encontros-individuais .diferencial');
  if (diferencialEl) {
    const diferencialObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 300);
          diferencialObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    diferencialObserver.observe(diferencialEl);
  }
  
  // Observar section headers
  const sectionHeaders = document.querySelectorAll('.section-header');
  sectionHeaders.forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(30px)';
    headerObserver.observe(header);
  });
  
  // Observar items de Para Quem É com observer específico
  const paraQuemItems = document.querySelectorAll('.para-quem-item[data-index]');
  paraQuemItems.forEach(item => {
    paraQuemObserver.observe(item);
  });
  
  // Observer específico para Conquistas - fade-in simples com delay escalonado
  const conquistasObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const item = entry.target;
        const index = parseInt(item.getAttribute('data-index')) || 0;
        const delay = (index - 1) * 0.1; // Delay suave entre items
        
        setTimeout(() => {
          item.classList.add('visible');
        }, delay * 1000);
        
        conquistasObserver.unobserve(item);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });
  
  // Observar items de Conquistas com observer específico
  const conquistaItems = document.querySelectorAll('.conquista-item[data-index]');
  conquistaItems.forEach(item => {
    conquistasObserver.observe(item);
  });
  
  // Observer específico para Benefícios - reveal escalonado
  const beneficiosObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const item = entry.target;
        const delay = index * 0.08; // Delay escalonado suave
        
        setTimeout(() => {
          item.classList.add('visible');
        }, delay * 1000);
        
        beneficiosObserver.unobserve(item);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });
  
  // Observar items de Benefícios com observer específico
  const beneficioItems = document.querySelectorAll('.beneficio-item-flow');
  beneficioItems.forEach(item => {
    beneficiosObserver.observe(item);
  });
  
  // Observer específico para Bônus - reveal escalonado horizontal
  const bonusObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const item = entry.target;
        const delay = index * 0.12; // Delay escalonado suave
        
        setTimeout(() => {
          item.classList.add('visible');
        }, delay * 1000);
        
        bonusObserver.unobserve(item);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });
  
  // Observar features de Bônus com observer específico
  const bonusFeatures = document.querySelectorAll('.bonus-feature');
  bonusFeatures.forEach(feature => {
    bonusObserver.observe(feature);
    
    // Adicionar interatividade de clique/ativo
    feature.addEventListener('click', () => {
      // Toggle active state
      const isActive = feature.classList.contains('active');
      
      // Opcional: remover active de outros itens
      bonusFeatures.forEach(otherFeature => {
        if (otherFeature !== feature) {
          otherFeature.classList.remove('active');
        }
      });
      
      // Toggle do item atual
      feature.classList.toggle('active');
    });
  });
  
  // Observar cards de outras seções (exceto Encontros Individuais que tem observer próprio)
  const cardElements = document.querySelectorAll(`
    .bonus-feature,
    .mentor-item,
    .payment-card
  `);
  
  cardElements.forEach(card => {
    cardObserver.observe(card);
  });
}

// ===== HERO ANIMATIONS COORDENADAS =====
function initHeroAnimations() {
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;
  
  const heroTitle = heroSection.querySelector('h1');
  const heroSubtitle = heroSection.querySelector('.subtitle');
  const heroBadges = heroSection.querySelector('.hero-badges');
  const heroButton = heroSection.querySelector('.btn');
  const progressWrapper = heroSection.querySelector('.progress-wrapper');
  const progressBar = heroSection.querySelector('.progress-bar');
  
  // Inicializar todos os elementos como invisíveis
  [heroTitle, heroSubtitle, heroBadges, heroButton, progressWrapper].forEach(el => {
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    }
  });
  
  // Sequência de animações coordenadas
  setTimeout(() => {
    if (heroTitle) {
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    }
  }, 0);
  
  setTimeout(() => {
    if (heroSubtitle) {
      heroSubtitle.style.opacity = '1';
      heroSubtitle.style.transform = 'translateY(0)';
    }
  }, 300);
  
  setTimeout(() => {
    if (heroBadges) {
      heroBadges.style.opacity = '1';
      heroBadges.style.transform = 'translateY(0)';
    }
  }, 600);
  
  setTimeout(() => {
    if (progressWrapper) {
      progressWrapper.style.opacity = '1';
      progressWrapper.style.transform = 'translateY(0)';
      // A animação da barra será gerenciada por initProgressBar()
    }
  }, 900);
  
  setTimeout(() => {
    if (heroButton) {
      heroButton.style.opacity = '1';
      heroButton.style.transform = 'translateY(0)';
    }
  }, 1200);
}

// ===== PARALLAX SCROLL =====
function initParallax() {
  // Parallax removido para melhorar performance de scroll
  // Os efeitos visuais já são tratados pelo IntersectionObserver e CSS transitions
}

// ===== BACKGROUNDS DINÂMICOS =====
function initDynamicBackgrounds() {
  // Hero sem animações interativas - apenas cards de pagamento
  // Adicionar gradientes animados aos cards de pagamento
  const paymentCard = document.querySelector('.payment-card');
  if (paymentCard) {
    paymentCard.classList.add('animate-gradientShift');
  }
}

// ===== CARROSSEL VERTICAL DE 3 FILEIRAS =====
function initCarrossel() {
  const carrosselContainer = document.querySelector('.carrossel-container');
  
  if (!carrosselContainer) return;
  
  // Buscar todas as imagens de depoimentos
  const depoimentoImages = [
    'IMG_3647.PNG',
    'IMG_3648.PNG',
    'IMG_3649.PNG',
    'IMG_3650.PNG',
    'IMG_3651.PNG',
    'IMG_3652.PNG',
    'IMG_3653.PNG',
    'IMG_3654.PNG',
    'IMG_3655.PNG'
  ];
  
  // Distribuir imagens igualmente entre as 3 fileiras
  const imagesPerFileira = Math.ceil(depoimentoImages.length / 3);
  const fileiras = [
    { class: 'scroll-up', images: depoimentoImages.slice(0, imagesPerFileira) },
    { class: 'scroll-down', images: depoimentoImages.slice(imagesPerFileira, imagesPerFileira * 2) },
    { class: 'scroll-up-fast', images: depoimentoImages.slice(imagesPerFileira * 2) }
  ];
  
  // Criar HTML das fileiras
  fileiras.forEach((fileira) => {
    if (fileira.images.length === 0) return; // Pular fileiras vazias
    
    const fileiraElement = document.createElement('div');
    fileiraElement.className = `carrossel-fileira ${fileira.class}`;
    
    const trackElement = document.createElement('div');
    trackElement.className = 'carrossel-track';
    
    // Duplicar imagens para loop infinito (criar 2 cópias completas)
    const duplicatedImages = [...fileira.images, ...fileira.images];
    
    duplicatedImages.forEach(imgName => {
      const itemElement = document.createElement('div');
      itemElement.className = 'carrossel-item';
      
      const imgElement = document.createElement('img');
      imgElement.src = `public/Depoimentos/${imgName}`;
      imgElement.alt = 'Depoimento de transformação';
      imgElement.loading = 'lazy';
      
      // Fallback em caso de erro
      imgElement.onerror = function() {
        console.warn(`Imagem não encontrada: ${imgName}`);
        itemElement.style.display = 'none';
      };
      
      itemElement.appendChild(imgElement);
      trackElement.appendChild(itemElement);
    });
    
    fileiraElement.appendChild(trackElement);
    carrosselContainer.appendChild(fileiraElement);
  });
  
  // Touch gestures para mobile (pausar no hover/toque) com transição suave
  let pauseTimeout;
  carrosselContainer.addEventListener('touchstart', () => {
    clearTimeout(pauseTimeout);
    const tracks = carrosselContainer.querySelectorAll('.carrossel-track');
    tracks.forEach(track => {
      track.style.transition = 'opacity 0.3s ease';
      track.style.animationPlayState = 'paused';
    });
  }, { passive: true });
  
  carrosselContainer.addEventListener('touchend', () => {
    pauseTimeout = setTimeout(() => {
      const tracks = carrosselContainer.querySelectorAll('.carrossel-track');
      tracks.forEach(track => {
        requestAnimationFrame(() => {
          track.style.animationPlayState = 'running';
          track.style.transition = '';
        });
      });
    }, 2000);
  }, { passive: true });
  
  // Melhorar a fluidez do hover com requestAnimationFrame e throttle
  let hoverThrottle = false;
  
  carrosselContainer.addEventListener('mouseenter', () => {
    if (hoverThrottle) return;
    hoverThrottle = true;
    
    requestAnimationFrame(() => {
      const tracks = carrosselContainer.querySelectorAll('.carrossel-track');
      tracks.forEach(track => {
        track.style.animationPlayState = 'paused';
      });
      hoverThrottle = false;
    });
  }, { passive: true });
  
  carrosselContainer.addEventListener('mouseleave', () => {
    if (hoverThrottle) return;
    hoverThrottle = true;
    
    requestAnimationFrame(() => {
      const tracks = carrosselContainer.querySelectorAll('.carrossel-track');
      tracks.forEach(track => {
        track.style.animationPlayState = 'running';
      });
      hoverThrottle = false;
    });
  }, { passive: true });
  
  // Otimizar performance: usar GPU acceleration para todas as animações
  requestAnimationFrame(() => {
    const tracks = carrosselContainer.querySelectorAll('.carrossel-track');
    tracks.forEach(track => {
      // Forçar aceleração de hardware
      track.style.transform = 'translate3d(0, 0, 0)';
      track.style.willChange = 'transform';
    });
  });
}

// ===== COOKIE BANNER E CONSENT MODE =====
function initCookieBanner() {
  const cookieBanner = document.querySelector('.cookie-banner');
  const acceptBtn = document.querySelector('.cookie-accept');
  const declineBtn = document.querySelector('.cookie-decline');
  
  // Verificar se já aceitou cookies
  const cookieConsent = localStorage.getItem('cookieConsent');
  
  if (!cookieConsent && cookieBanner) {
    // Consent Mode padrão negado
    gtag('consent', 'update', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied'
    });
    
    cookieBanner.classList.add('active');
  }
  
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieBanner.classList.remove('active');
      
      // Atualizar Consent Mode para aceito
      gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      });
    });
  }
  
  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'declined');
      cookieBanner.classList.remove('active');
      
      // Manter Consent Mode negado
      gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied'
      });
    });
  }
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      
      const target = document.querySelector(href);
      
      if (target) {
        const offsetTop = target.offsetTop - 80; // Offset para header fixo
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== GOOGLE TAG MANAGER / ANALYTICS =====
// Função gtag para Consent Mode (será definida pelo GTM)
function gtag() {
  if (typeof window.gtag !== 'undefined') {
    window.gtag.apply(window, arguments);
  }
}

// ===== UTILITÁRIOS =====
// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ===== PERFORMANCE: LAZY LOADING =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===== CHECKOUT PREMIUM - FUNCIONALIDADES =====
function initCheckout() {
  syncCheckoutProgressBar();
  initCountdown();
  initCheckoutAnimations();
  initPaymentBadgesMagnetic();
  initSummaryItemsAnimation();
}

// Sincronizar barra de progresso entre hero e checkout
function syncCheckoutProgressBar() {
  const heroProgressBar = document.querySelector('.progress-bar');
  const checkoutProgressBar = document.querySelector('.checkout-progress-bar-minimal');
  const checkoutProgressFill = document.querySelector('.checkout-progress-fill-minimal');
  const checkoutProgressPercentage = document.querySelector('.checkout-progress-percentage-minimal');
  
  if (!checkoutProgressBar || !checkoutProgressFill) return;
  
  // Usar o mesmo valor de progresso do hero (15%)
  const progressValue = PROGRESS_PERCENTAGE;
  
  // Observar quando a seção checkout entra na viewport
  const checkoutSection = document.querySelector('.checkout-minimal');
  if (!checkoutSection) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animar a barra quando visível
        setTimeout(() => {
          // A estrutura tem: container > bar (width animado) > fill (sempre 100%)
          if (checkoutProgressBar) {
            // Adicionar classe para ativar shimmer
            checkoutProgressBar.classList.add('animating');
            
            // Animar a largura da barra (não do fill)
            checkoutProgressBar.style.width = `${progressValue}%`;
            checkoutProgressBar.setAttribute('data-progress', progressValue);
            
            // Adicionar pulso suave após a animação
            setTimeout(() => {
              checkoutProgressBar.classList.add('animated');
            }, 1500);
          }
          // O fill sempre deve ter 100% para preencher o container da barra
          if (checkoutProgressFill) {
            checkoutProgressFill.style.width = '100%';
          }
          
          // Animar o número de porcentagem
          if (checkoutProgressPercentage) {
            animatePercentage(0, progressValue, 1500, checkoutProgressPercentage);
          }
        }, 200);
        
        observer.unobserve(checkoutSection);
      }
    });
  }, { threshold: 0.3 });
  
  observer.observe(checkoutSection);
  
  // Sincronizar com mudanças do hero (se houver)
  if (heroProgressBar) {
    const heroObserver = new MutationObserver(() => {
      const heroProgress = parseInt(heroProgressBar.getAttribute('data-progress') || '0');
      if (heroProgress > 0) {
        // Atualizar a largura da barra (não do fill)
        if (checkoutProgressBar) {
          checkoutProgressBar.style.width = `${heroProgress}%`;
          checkoutProgressBar.setAttribute('data-progress', heroProgress);
        }
        // O fill sempre deve ter 100% para preencher o container da barra
        if (checkoutProgressFill) {
          checkoutProgressFill.style.width = '100%';
        }
        if (checkoutProgressPercentage) {
          checkoutProgressPercentage.textContent = `${heroProgress}%`;
        }
      }
    });
    
    heroObserver.observe(heroProgressBar, { attributes: true, attributeFilter: ['data-progress'] });
  }
}

// Contador Regressivo até 15 de Janeiro 2026, 20h
function initCountdown() {
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minutesEl = document.getElementById('countdown-minutes');
  const secondsEl = document.getElementById('countdown-seconds');
  
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
  
  // Data alvo: 15 de Janeiro 2026, 20h (horário de Brasília UTC-3)
  const targetDate = new Date('2026-01-15T20:00:00-03:00').getTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance < 0) {
      // Contador expirado
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Animação de flip nos números que mudam
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }
  
  // Atualizar imediatamente
  updateCountdown();
  
  // Atualizar a cada segundo
  setInterval(updateCountdown, 1000);
}

// Animações de entrada na viewport do checkout
function initCheckoutAnimations() {
  const checkoutCard = document.querySelector('.checkout-card');
  if (!checkoutCard) return;
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animar o card principal
        setTimeout(() => {
          checkoutCard.classList.add('visible');
        }, 100);
        
        observer.unobserve(checkoutCard);
      }
    });
  }, observerOptions);
  
  observer.observe(checkoutCard);
}

// Magnetic effects nas badges de pagamento (removido - não há mais badges)
function initPaymentBadgesMagnetic() {
  // Função removida - não há mais badges de pagamento
  return;
}

// Animar items do resumo da mentoria ao entrar na viewport (removido - não há mais animação individual)
function initSummaryItemsAnimation() {
  // Função removida - resumo é compacto e não precisa de animação individual
  return;
}

// ===== REDUCED MOTION SUPPORT =====
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.setProperty('--transition-fast', '0s');
  document.documentElement.style.setProperty('--transition-normal', '0s');
  document.documentElement.style.setProperty('--transition-slow', '0s');
  
  const style = document.createElement('style');
  style.textContent = `
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  `;
  document.head.appendChild(style);
}
