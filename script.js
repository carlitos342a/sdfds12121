 // 🧠 Open selected gallery
    function openGallery(folder) {
      const home = document.getElementById('home');
      const gallery = document.getElementById('gallery');
      home.style.display = 'none';
      gallery.style.display = 'grid';
      gallery.innerHTML = '';

      // Load images
      for (let i = 1; i <= 20; i++) {
        const img = document.createElement('img');
        img.src = `images/${folder}/${i}.jpg`;
        img.onerror = () => img.remove();
        img.onclick = () => openFullscreen('image', img.src);
        gallery.appendChild(img);
      }

      // Load videos
      for (let v = 1; v <= 3; v++) {
        const wrapper = document.createElement('div');
        wrapper.className = 'video-wrapper';

        const vid = document.createElement('video');
        vid.src = `videos/${folder}/${v}.mp4`;
        vid.muted = true;
        vid.oncanplay = () => gallery.appendChild(wrapper);
        vid.onerror = () => wrapper.remove();

        // Play icon overlay
        const icon = document.createElement('div');
        icon.className = 'play-icon';
        icon.innerHTML = '▶️';

        // Clicking the video opens fullscreen
        wrapper.onclick = () => openFullscreen('video', vid.src);

        wrapper.appendChild(vid);
        wrapper.appendChild(icon);
      }

      // Back button
      const back = document.createElement('button');
      back.textContent = '← Back';
      back.onclick = goHome;
      back.id = 'back';
      document.body.appendChild(back);
    }

    // 🔙 Back to home
    function goHome() {
      document.getElementById('gallery').style.display = 'none';
      document.getElementById('home').style.display = 'block';
      document.getElementById('gallery').innerHTML = '';
      document.getElementById('back').remove();
    }

    // 🔍 Fullscreen open (image or video)
    function openFullscreen(type, src) {
      const full = document.getElementById('fullscreen');
      full.innerHTML = `
        <button class="close-btn" onclick="closeFullscreen()">×</button>
        ${type === 'image'
          ? `<img src="${src}">`
          : `<video id="fsVideo" src="${src}" controls></video>`}
      `;
      full.style.display = 'flex';
    }

    // ❌ Close fullscreen & stop video sound
    function closeFullscreen() {
      const full = document.getElementById('fullscreen');
      const vid = document.getElementById('fsVideo');
      if (vid) {
        vid.pause();       // stop video
        vid.currentTime = 0; // rewind to start
      }
      full.style.display = 'none';
      full.innerHTML = `<button class="close-btn" onclick="closeFullscreen()">×</button>`;
    }