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
    // Applicant
    '/apis/customer-api/applicant/applicant': 'GET',
    '/apis/customer-api/applicant/applicant-spii': 'GET',
    
    // Appointments (files: 10-appointment.mdx, 20-booking.mdx, 30-deletion.mdx, 40-reschedule.mdx, 50-times.mdx, 60-prospect.mdx)
    '/apis/customer-api/appointments/appointment': 'GET',
    '/apis/customer-api/appointments/booking': 'POST',
    '/apis/customer-api/appointments/deletion': 'DELETE',
    '/apis/customer-api/appointments/reschedule': 'PUT',
    '/apis/customer-api/appointments/times': 'GET',
    '/apis/customer-api/appointments/prospect': 'GET',
    
    // Community (files: 10-community.mdx, 20-floorplans.mdx)
    '/apis/customer-api/community/community': 'GET',
    '/apis/customer-api/community/floorplans': 'GET',
    
    // Discovery Sources
    '/apis/customer-api/discovery-sources/discovery-sources': 'GET',
    
    // Document
    '/apis/customer-api/documents/document': 'GET',
    
    // Employee Group
    '/apis/customer-api/employee-group/employee-group': 'GET',
    
    // Lease
    '/apis/customer-api/lease/lease': 'GET',
    
    // Lease Transaction (files: 10-lease-transaction.mdx, 20-edit-lease-transaction.mdx)
    '/apis/customer-api/lease-transaction/lease-transaction': 'GET',
    '/apis/customer-api/lease-transaction/edit-lease-transaction': 'PATCH',
    
    // Listings (files: 10-listing.mdx, 20-listings.mdx, 30-listing-sync.mdx)
    '/apis/customer-api/listings/listing': 'GET',
    '/apis/customer-api/listings/listings': 'GET',
    '/apis/customer-api/listings/listing-sync': 'GET',
    
    // Prospect (files: 10-prospect.mdx, 20-prospects.mdx)
    '/apis/customer-api/prospect/prospect': 'POST',
    '/apis/customer-api/prospect/prospects': 'PUT',
    
    // Quote (files: 10-quote.mdx, 20-quote-pdf.mdx)
    '/apis/customer-api/quote/quote': 'GET',
    '/apis/customer-api/quote/quote-pdf': 'GET',
  };

  // Normalize href for consistent lookup (remove trailing slash and hash)
  function normalizeHref(href) {
    if (!href) return '';
    return href.replace(/\/$/, '').replace(/#.*$/, '') || href;
  }

  // Get HTTP method for a given href (handles trailing slash and tries multiple variations)
  function getHttpMethod(href) {
    if (!href) return null;
    
    const normalized = normalizeHref(href);
    
    // Try exact match first
    let method = hrefToMethodMap[normalized];
    if (method) return method;
    
    // Try with trailing slash
    method = hrefToMethodMap[normalized + '/'];
    if (method) return method;
    
    // For single-item categories, try matching just the folder name
    // e.g., /apis/customer-api/employee-group -> employee-group/employee-group
    const singleCategoryMatch = normalized.match(/\/apis\/customer-api\/([^\/]+)$/);
    if (singleCategoryMatch) {
      const folderName = singleCategoryMatch[1];
      // Try the folder/folder pattern (for single-item categories)
      method = hrefToMethodMap[`/apis/customer-api/${folderName}/${folderName}`];
      if (method) return method;
    }
    
    // Try matching by path segments
    const pathMatch = normalized.match(/\/apis\/customer-api\/(.+)$/);
    if (pathMatch) {
      const path = pathMatch[1];
      const segments = path.split('/');
      
      // Try last segment as filename
      if (segments.length >= 2) {
        const folder = segments[0];
        const file = segments[segments.length - 1];
        method = hrefToMethodMap[`/apis/customer-api/${folder}/${file}`];
        if (method) return method;
      }
      
      // For single segment (category-only), try folder/folder pattern
      if (segments.length === 1) {
        const folder = segments[0];
        method = hrefToMethodMap[`/apis/customer-api/${folder}/${folder}`];
        if (method) return method;
      }
    }
    
    return null;
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
    // Get all sidebar links including category links that are also direct links
    // Single-item categories are rendered as category items with links
    const selectors = [
      '.theme-doc-sidebar-item-link a.menu__link:not(.menu__link--sublist)',
      '.theme-doc-sidebar-item-category > a.menu__link',
      '.theme-doc-sidebar-item-category a.menu__link:not(.menu__link--sublist)'
    ];
    
    const sidebarLinks = new Set();
    selectors.forEach(selector => {
      try {
        document.querySelectorAll(selector).forEach(link => {
          if (link && link.nodeType === Node.ELEMENT_NODE) {
            sidebarLinks.add(link);
          }
        });
      } catch (e) {
        // Ignore selector errors
      }
    });
    
    sidebarLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href === '#' || href.startsWith('#')) return;

      // Only process customer-api links
      if (!href.includes('/apis/customer-api/')) return;

      const httpMethod = getHttpMethod(href);
      if (httpMethod) {
        updateBadge(link, httpMethod);
      }
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

