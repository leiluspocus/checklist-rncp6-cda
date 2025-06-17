import { ProgressManager } from './progress.js';
import { ExportManager } from './export.js';
import { FilterManager } from './filters.js';
import { VersionManager } from './version-manager.js';

class App {
    constructor() {
        this.progressManager = new ProgressManager();
        this.exportManager = new ExportManager();
        this.filterManager = new FilterManager();
        this.versionManager = new VersionManager();
        
        this.initializeVersion();
        
        document.addEventListener('checklist-updated', () => {
            this.progressManager.updateProgress();
        });
    }

    async initializeVersion() {
        await this.versionManager.loadVersion();
        const versionElement = document.getElementById('version-number');
        if (versionElement) {
            versionElement.textContent = this.versionManager.getFormattedVersion();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
}); 