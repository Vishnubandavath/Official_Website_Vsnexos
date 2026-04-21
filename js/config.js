/**
 * Vsnexos Shared Configuration
 * This file contains all shared data across all Vsnexos websites
 * Sync this file to all sites when updating
 */
(function () {
  "use strict";

  window.VSNEXOS_CONFIG = {
    // Branding
    companyName: "Vsnexos Tech",
    tagline: "Elite Web Development & Custom Software Solutions",
    logo: "assets/Vsnexos-logo-svg.svg",
    primaryColor: "#d4af37",
    secondaryColor: "#f4d03f",
    
    // Contact Information
    email: "vsnexostech@gmail.com",
    phone: "+91-9100665935",
    whatsapp: "https://wa.me/919100665935",
    address: {
      street: "Jaya Apartment, HUDA Colony, Saroornagar",
      city: "Hyderabad",
      state: "Telangana",
      postalCode: "500035",
      country: "IN"
    },
    
    // Social Media Links
    social: {
      linkedin: "https://www.linkedin.com/in/vsnexos-digital-solutions/",
      instagram: "https://www.instagram.com/vsnexos/",
      threads: "https://www.threads.com/@file"
    },
    
    // Form Endpoints
    forms: {
      contact: "https://formspree.io/f/mlgowdbz"
    },
    
    // Analytics
    analytics: {
      googleAnalyticsId: "G-90NZMY8QQN"
    },
    
    // Website URLs
    urls: {
      main: "https://vsnexos.com",
      careers: "https://careers.vsnexos.com",
      tools: "https://tools.vsnexos.com"
    }
  };

  // Backward compatibility aliases for existing code
  window.FORMSPREE_ENDPOINT = window.VSNEXOS_CONFIG.forms.contact;
  window.endformpoint = window.VSNEXOS_CONFIG.forms.contact;
  window.END_FORM_ENDPOINT = window.VSNEXOS_CONFIG.forms.contact;
})();
