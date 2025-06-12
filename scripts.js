window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loading-screen').classList.add('hidden');
    }, 3000);
});

async function fetchDiscordInfo() {
    const discordId = '1324300684446666837';
    const apiUrl = `https://discord-lookup-api-one-coral.vercel.app/v1/user/${discordId}`;
   
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
    
            if (data.id) {
                const accentColor = data.accent_color ? `#${data.accent_color.toString(16)}` : '#7289da'; // Default to Discord blurple

                document.documentElement.style.setProperty('--accent-color', accentColor);
                document.title = data.global_name || data.username;
                const favicon = document.createElement('link');
                favicon.rel = 'icon';
                favicon.href = data.avatar?.link || 'https://via.placeholder.com/150';
                document.head.appendChild(favicon);
                document.getElementById('avatar').src = data.avatar?.link || 'https://via.placeholder.com/150';
              
                document.getElementById('display-name').textContent = data.global_name || 'N/A';
                document.getElementById('username').textContent = `@${data.username}` || 'N/A';
            } else {
                document.getElementById('discord-info').innerHTML = '<p>Failed to load Discord data.</p>';
            }
    
        } catch (error) {
            console.error('Error fetching Discord info:', error);
            document.getElementById('discord-info').innerHTML = '<p>Failed to load Discord data.</p>';
        }
    }
    
    fetchDiscordInfo();
    