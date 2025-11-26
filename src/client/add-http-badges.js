import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  /**
   * ============================================================================
   * HTTP METHOD BADGES CONFIGURATION
   * ============================================================================
   * 
   * To add or change HTTP method badges in the sidebar, update this map.
   * 
   * Format: '/apis/customer-api/section/endpoint': 'METHOD'
   * 
   * Supported methods: GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD
   * 
   * Note: Trailing slashes are automatically handled, so you only need one entry.
   * 
   * Example:
   *   '/apis/customer-api/applicant/applicant': 'GET',
   * ============================================================================
   */
  const hrefToMethodMap = {
    '/apis/customer-api/applicant/applicant': 'GET',
    '/apis/customer-api/applicant/applicant-spii': 'GET',
  };

  // Normalize href for consistent lookup (remove trailing slash)
  function normalizeHref(href) {
    return href.replace(/\/$/, '') || href;
  }

  // Get HTTP method for a given href (handles trailing slash automatically)
  function getHttpMethod(href) {
    const normalized = normalizeHref(href);
    return hrefToMethodMap[normalized];
  }

  // Update or create badge for a link
  function updateBadge(link, httpMethod) {
    let badge = link.querySelector('.http-method-badge');
    
    if (httpMethod) {
      link.classList.add('menu__link--with-badge');
      
      if (badge) {
        // Update existing badge if method changed
        const currentMethod = badge.textContent.trim();
        if (currentMethod !== httpMethod) {
          badge.className = `http-method-badge http-method-badge--${httpMethod.toLowerCase()}`;
          badge.textContent = httpMethod;
        }
      } else {
        // Create new badge
        badge = document.createElement('span');
        badge.className = `http-method-badge http-method-badge--${httpMethod.toLowerCase()}`;
        badge.textContent = httpMethod;
        link.appendChild(badge);
      }
    } else if (badge) {
      // Remove badge if method no longer exists
      badge.remove();
      link.classList.remove('menu__link--with-badge');
    }
  }

  // Debounce function to limit execution frequency
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

  function addHttpMethodBadges() {
    // Single optimized selector - only get actual link items, not category headers
    const sidebarLinks = document.querySelectorAll(
      '.theme-doc-sidebar-item-link a.menu__link:not(.menu__link--sublist)'
    );
    
    sidebarLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const httpMethod = getHttpMethod(href);
      updateBadge(link, httpMethod);
    });
  }

  // Debounced version for observer (prevents excessive calls)
  const debouncedAddBadges = debounce(addHttpMethodBadges, 100);

  // Initial run
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addHttpMethodBadges);
  } else {
    addHttpMethodBadges();
  }

  // Single delayed run for dynamically loaded content
  setTimeout(addHttpMethodBadges, 500);

  // Watch for sidebar changes with debouncing
  const observer = new MutationObserver(debouncedAddBadges);

  // Observe sidebar container
  const observeSidebar = () => {
    const sidebarContainer = document.querySelector(
      '.theme-doc-sidebar-container, .menu__list, nav.menu'
    );
    if (sidebarContainer) {
      observer.observe(sidebarContainer, {
        childList: true,
        subtree: true,
      });
    } else {
      setTimeout(observeSidebar, 100);
    }
  };

  observeSidebar();
}

