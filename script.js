document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const listItems = document.querySelectorAll('.checklist li');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            listItems.forEach(item => {
                const badge = item.querySelector('.demo-badge');
                if (filter === 'all') {
                    item.classList.remove('hidden');
                } else {
                    if (badge) {
                        const badgeText = badge.textContent.trim();
                        if (filter.startsWith('demo') && badgeText === `Démo ${filter.replace('demo', '')}`) {
                            item.classList.remove('hidden');
                        } else if (filter === 'dossier' && badgeText === 'Dossier projet') {
                            item.classList.remove('hidden');
                        } else if (filter === 'optionnel' && badgeText === 'Optionnel') {
                            item.classList.remove('hidden');
                        } else {
                            item.classList.add('hidden');
                        }
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });
        });
    });
}); 