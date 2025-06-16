export class ExportManager {
    constructor() {
        this.init();
    }

    init() {
        const exportButton = document.querySelector('.export-btn');

            exportButton.addEventListener('click', () => {
                this.exportToPDF();
            });
    }

    exportToPDF() {
        console.log('Début de l\'export PDF');
        const progressSticky = document.querySelector('.progress-sticky');
        const originalDisplay = progressSticky.style.display;
        progressSticky.style.display = 'none';

        const element = document.querySelector('main');
        if (!element) {
            console.error('Élément main non trouvé');
            return;
        }

        const opt = {
            margin: 1,
            filename: 'checklist-progress.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        
        console.log('Configuration de html2pdf');
        html2pdf().set(opt).from(element).save().then(() => {
            console.log('PDF généré avec succès');
            progressSticky.style.display = originalDisplay;
        }).catch(error => {
            console.error('Erreur lors de la génération du PDF:', error);
            progressSticky.style.display = originalDisplay;
        });
    }
} 