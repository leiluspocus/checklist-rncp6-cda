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
        // Mettre à jour les boutons actifs
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        // Filtrer les éléments
        document.querySelectorAll('.checklist li').forEach(item => {
            const badge = item.querySelector('.demo-badge');
            if (filter === 'all') {
                item.classList.remove('hidden');
            } else {
                const isVisible = badge && badge.textContent.toLowerCase().includes(filter.toLowerCase());
                item.classList.toggle('hidden', !isVisible);
            }
        });
    }
} 