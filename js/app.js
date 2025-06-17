import { ProgressManager } from './progress.js';
import { ExportManager } from './export.js';
import { FilterManager } from './filters.js';

class App {
    constructor() {
        this.progressManager = new ProgressManager();
        this.exportManager = new ExportManager();
        this.filterManager = new FilterManager();
        this.loadVersion();
        
        document.addEventListener('checklist-updated', () => {
            this.progressManager.updateProgress();
        });
    }

    async loadVersion() {
        try {
            const response = await fetch('config.json');
            const config = await response.json();
            const versionElement = document.getElementById('version-number');
            if (versionElement) {
                versionElement.textContent = `v${config.version}`;
            }
        } catch (error) {
            console.error('Erreur lors du chargement de la version:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
}); 