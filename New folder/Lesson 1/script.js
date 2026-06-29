const planetData = {
    moon: {
        name: "MOON",
        image: "assets/moon.png",
        description: "See our planet as you've never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you're there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
        distance: "384,400 KM",
        travelTime: "3 DAYS"
    },
    mars: {
        name: "MARS",
        image: "assets/mars.png",
        description: "Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!",
        distance: "225 MIL. KM",
        travelTime: "9 MONTHS"
    },
    europa: {
        name: "EUROPA",
        image: "assets/europa.png",
        description: "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface covering a massive subsurface ocean, it’s one of the most promising places to search for alien life.",
        distance: "628 MIL. KM",
        travelTime: "3 YEARS"
    },
    titan: {
        name: "TITAN",
        image: "assets/titan.png",
        description: "The only moon in our solar system known to have a dense atmosphere and liquid rivers. The only catch? The rivers aren't water—they're liquid methane and ethane. A truly otherworldly destination for extreme explorers.",
        distance: "1.4 BIL. KM",
        travelTime: "7 YEARS"
    }
};

// 2. DOM Pointers
const tabs = document.querySelectorAll('.planet-nav .tab');
const planetImg = document.getElementById('planet-image');
const planetNameTag = document.getElementById('planet-name');
const planetDescTag = document.getElementById('planet-description');
const planetDistTag = document.getElementById('planet-distance');
const planetTimeTag = document.getElementById('planet-time');
const textContainer = document.querySelector('.planet-text-container');
const downloadBtn = document.getElementById('download-btn');

// Set baseline initial download path safely
if (downloadBtn && planetImg) {
    downloadBtn.href = planetImg.src;
}

// 3. Tab Switching Event Loop
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        if(tab.classList.contains('active-planet')) return; // Stop redundant clicks
        
        // Update menu highlight underline states
        tabs.forEach(t => t.classList.remove('active-planet'));
        tab.classList.add('active-planet');

        const key = tab.getAttribute('data-planet');
        const data = planetData[key];

        // Guard clause: safety check to ensure data exists for key
        if (!data) return;

        // Begin CSS sliding transition states safely
        if (planetImg) planetImg.classList.add('slide-out');
        if (textContainer) textContainer.classList.add('slide-out');

        // Swap data values when completely transparent
        setTimeout(() => {
            if (planetNameTag) planetNameTag.textContent = data.name;
            if (planetDescTag) planetDescTag.textContent = data.description;
            if (planetDistTag) planetDistTag.textContent = data.distance;
            if (planetTimeTag) planetTimeTag.textContent = data.travelTime;
            
            if (planetImg) {
                planetImg.src = data.image;
                planetImg.alt = data.name;
            }
            
            if (downloadBtn) {
                downloadBtn.href = data.image;
                downloadBtn.setAttribute('download', `${key}-guide.png`);
            }
        }, 300);

        // Slide everything elegantly back into view
        setTimeout(() => {
            if (planetImg) planetImg.classList.remove('slide-out');
            if (textContainer) textContainer.classList.remove('slide-out');
        }, 350);
    });
});