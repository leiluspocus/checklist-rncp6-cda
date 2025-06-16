import { ProgressManager } from './progress.js';
import { ExportManager } from './export.js';
import { FilterManager } from './filters.js';

class App {
    constructor() {
        this.progressManager = new ProgressManager();
        this.exportManager = new ExportManager();
        this.filterManager = new FilterManager();

        document.addEventListener('checklist-updated', () => {
            this.progressManager.updateProgress();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
}); 