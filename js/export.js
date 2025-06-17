import { VersionManager } from './version-manager.js';

export class ExportManager {
    constructor() {
        this.versionManager = new VersionManager();
        this.init();
    }

    init() {
        const exportButton = document.querySelector('.export-btn');
        exportButton.addEventListener('click', () => {
            this.exportToPDF();
        });
    }

    async exportToPDF() {
        const element = document.querySelector('main');
        if (!element) {
            return;
        }

        await this.versionManager.loadVersion();
        const version = this.versionManager.getFormattedVersion();
        const date = new Date().toLocaleDateString('fr-FR').replace(/\//g, '-');

        const opt = {
            margin: [0.5, 0.5, 0.5, 0.5],
            filename: `checklist-cda-${version}-${date}.pdf`,
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                letterRendering: true,
                scrollY: 0
            },
            jsPDF: { 
                unit: 'in', 
                format: 'a4', 
                orientation: 'portrait',
                compress: true
            },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };
        
        html2pdf().set(opt).from(element).save().catch(error => {
            console.error('Erreur lors de la génération du PDF:', error);
        });
    }
} 