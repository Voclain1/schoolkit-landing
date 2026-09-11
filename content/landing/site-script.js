        const bar = document.getElementById('bar');
        addEventListener('scroll', () => bar.classList.toggle('scrolled', scrollY > 40));

        /* Analytics hooks.

           Conversion events go through window.skTrack, the typed, PII-scrubbed
           helper installed by components/Analytics.tsx (lib/analytics.ts).
           Secondary engagement events keep using gtag directly; both are no-ops
           until GA4 has loaded. Never pass user input to either one. */
        function trackEvent(event, params) {
            if (typeof window.gtag === 'function') window.gtag('event', event, params || {});
        }
        window.trackEvent = trackEvent;

        document.addEventListener('click', (e) => {
            const wa = e.target.closest('a[href*="wa.me"], a[href*="whatsapp.com"]');
            if (wa) window.skTrack?.('whatsapp_cta_clicked', {
                placement: wa.dataset.location || 'unknown',
                method: 'whatsapp'
            });

            const cta = e.target.closest('.pill, .pc-cta');
            if (cta) trackEvent('cta_click', { label: cta.textContent.trim() });
        });
