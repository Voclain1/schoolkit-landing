        const bar = document.getElementById('bar');
        addEventListener('scroll', () => bar.classList.toggle('scrolled', scrollY > 40));
        document.getElementById('yr').textContent = new Date().getFullYear();

        const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: .12 });
        document.querySelectorAll('.rv').forEach(el => io.observe(el));

        const track = document.getElementById('track');
        track.innerHTML += track.innerHTML;

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

            btn.textContent = 'Joining...';

            try {
                await fetch(WAITLIST_ENDPOINT, {
                    method: 'POST',
                    mode: 'no-cors', // 👈 THIS is the fix
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: v,
                        ts: new Date().toISOString(),
                        source: 'landing-page'
                    })
                });
                // With no-cors we can't read the response, so assume success
                input.style.display = 'none';
                btn.textContent = '🎉 You\'re on the list!';
                document.getElementById('ok' + n).style.display = 'block';
            } catch (err) {
                btn.textContent = 'Try again';
                console.error(err);
            }
        }

