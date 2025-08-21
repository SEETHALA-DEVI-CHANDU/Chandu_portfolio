document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    const setIcon = (theme) => {
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = theme === 'dark-theme' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    };

    // Apply saved theme on page load
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        setIcon(currentTheme);
    } else {
        // Default to light theme and set icon
        setIcon('light-theme');
    }

    // Handle theme toggle button click
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            let theme = document.body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
            localStorage.setItem('theme', theme);
            setIcon(theme);
        });
    }
});