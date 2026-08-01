        const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: .12 });
        document.querySelectorAll('.rv').forEach(el => io.observe(el));

        const track = document.getElementById('track');
        track.innerHTML += track.innerHTML;

        function setPeriod(period) {
            document.querySelectorAll('.pt-btn').forEach(b => b.classList.toggle('active', b.dataset.period === period));
            document.querySelectorAll('.pc-price').forEach(el => el.classList.toggle('show-year', period === 'year'));
        }

        /* Analytics: fire once per section when it first enters the viewport. */
        const viewIo = new IntersectionObserver(es => es.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target;
            if (el.id === 'cta1') window.trackEvent?.('form_view', { location: 'hero' });
            if (el.id === 'cta2') window.trackEvent?.('form_view', { location: 'footer' });
            if (el.id === 'pricing') window.trackEvent?.('pricing_view');
            viewIo.unobserve(el);
        }), { threshold: .3 });
        ['cta1', 'cta2', 'pricing'].forEach(id => {
            const el = document.getElementById(id);
            if (el) viewIo.observe(el);
        });

        /* Paste your Google Apps Script Web App URL between the quotes below.
           Setup steps are in the deployment guide. Until you do, signups are
           logged to the browser console so the form still works in preview. */
        const WAITLIST_ENDPOINT = "https://script.google.com/macros/s/AKfycbxxf4Z32cqWtaT2SFPcmkYgogVMPM57MpDHfD9-zrpOUmJm9eqbMrzuyzOtK3Nxp5eU/exec";

        async function join(n) {
            const input = document.getElementById('e' + n);
            const btn = document.getElementById('cta' + n).querySelector('.pill');
            const v = (input.value || '').trim();

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
                input.style.borderColor = '#e0a52e';
                input.focus();
                return;
            }

            const phone = (document.getElementById('p' + n)?.value || '').trim();

            const source = n === 1 ? 'hero' : 'footer';
            window.trackEvent?.('form_submit_attempt', { source });

            btn.textContent = 'Joining...';

            try {
                await fetch(WAITLIST_ENDPOINT, {
                    method: 'POST',
                    mode: 'no-cors', // 👈 THIS is the fix
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: v,
                        phone: phone,
                        ts: new Date().toISOString(),
                        source: source
                    })
                });
                // With no-cors we can't read the response, so assume success
                input.style.display = 'none';
                btn.textContent = '🎉 You\'re on the list!';
                document.getElementById('ok' + n).style.display = 'block';
                window.trackEvent?.('form_submit_success', { source });
            } catch (err) {
                btn.textContent = 'Try again';
                console.error(err);
            }
        }
