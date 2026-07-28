        const bar = document.getElementById('bar');
        addEventListener('scroll', () => bar.classList.toggle('scrolled', scrollY > 40));
