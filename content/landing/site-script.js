        const bar = document.getElementById('bar');
        addEventListener('scroll', () => bar.classList.toggle('scrolled', scrollY > 40));

        /* Analytics hooks — fire only if gtag (Google Analytics) is present.
           No GA property is wired up yet; these are no-ops until it is. */
        function trackEvent(event, params) {
            if (typeof window.gtag === 'function') window.gtag('event', event, params || {});
        }
        window.trackEvent = trackEvent;

        document.addEventListener('click', (e) => {
            const wa = e.target.closest('a[href*="wa.me"]');
            if (wa) trackEvent('whatsapp_click', { location: wa.dataset.location || 'unknown' });

            const cta = e.target.closest('.pill, .pc-cta');
            if (cta) trackEvent('cta_click', { label: cta.textContent.trim() });
        });
