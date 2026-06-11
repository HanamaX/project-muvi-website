const GA_MEASUREMENT_ID = 'G-BYXPBWEF1T';

let initialized = false;

export const initGA = () => {
  if (initialized) return;
  initialized = true;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
};

export const pageview = (path) => {
  if (!window.dataLayer) return;
  window.dataLayer.push('config', GA_MEASUREMENT_ID, { page_path: path });
};
