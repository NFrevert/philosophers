const sparks = document.getElementById('sparks');

    /* Bild klickbar machen */
    document.getElementById('clickLayer').addEventListener('click', () => {
      window.location.href = './html/news.html';
    });

    /* Türspalt klickbar */
    document.getElementById('door-gap').addEventListener('click', () => {
      window.location.href = './html/news.html';
    });

    /* Funken erzeugen */
    function createSpark() {
      const spark = document.createElement('div');
      spark.classList.add('spark');

      spark.style.left = Math.random() * window.innerWidth + 'px';
      spark.style.top = (Math.random() * window.innerHeight) + 'px';

      const size = Math.random() * 4 + 2;
      spark.style.width = size + 'px';
      spark.style.height = size + 'px';

      const drift = (Math.random() - 0.5) * 80;
      spark.style.setProperty('--drift-x', drift + 'px');

      const speed = 1.6 + Math.random() * 1.2;
      spark.style.animationDuration = speed + 's';

      sparks.appendChild(spark);

      setTimeout(() => spark.remove(), speed * 1000);
    }

    setInterval(createSpark, 120);