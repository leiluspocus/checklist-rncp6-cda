export class FilterManager {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => this.filterItems(button.dataset.filter));
        });
    }

    filterItems(filter) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        document.querySelectorAll('.checklist li').forEach(item => {
            const badge = item.querySelector('.demo-badge');
            if (filter === 'all') {
                item.classList.remove('hidden');
            } else {
                const badgeText = badge ? badge.textContent.trim() : '';
                let isVisible = false;

                if (filter.startsWith('demo')) {
                    const demoNumber = filter.replace('demo', '');
                    isVisible = badgeText === `Démo ${demoNumber}`;
                } else if (filter === 'dossier') {
                    isVisible = badgeText === 'Dossier projet';
                } else {
                    isVisible = badgeText.toLowerCase() === filter.toLowerCase();
                }

                item.classList.toggle('hidden', !isVisible);
            }
        });
    }
} 