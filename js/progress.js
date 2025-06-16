export class ProgressManager {
    constructor() {
        this.progressBar = document.getElementById('progress-bar');
        this.progressText = document.getElementById('progress-text');
        this.setupEventListeners();
        this.loadSavedProgress();
    }

    setupEventListeners() {
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateProgress());
        });
    }

    updateProgress() {
        const totalItems = document.querySelectorAll('input[type="checkbox"]').length;
        const checkedItems = document.querySelectorAll('input[type="checkbox"]:checked').length;
        const progress = (checkedItems / totalItems) * 100;
        
        this.progressBar.style.width = `${progress}%`;
        this.progressText.textContent = `${Math.round(progress)}%`;
        
        this.saveProgress(totalItems, checkedItems, progress);
    }

    saveProgress(total, checked, progress) {
        localStorage.setItem('checklist-progress', JSON.stringify({
            total,
            checked,
            progress
        }));
    }

    loadSavedProgress() {
        const savedProgress = localStorage.getItem('checklist-progress');
        if (savedProgress) {
            const { checked } = JSON.parse(savedProgress);
            document.querySelectorAll('input[type="checkbox"]').forEach((input, index) => {
                input.checked = index < checked;
            });
            this.updateProgress();
        }
    }
} 