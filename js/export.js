export class ExportManager {
    constructor() {
        this.init();
    }

    init() {
        const exportButton = document.querySelector('.export-btn');
        if (exportButton) {
            exportButton.addEventListener('click', () => this.exportToPDF());
        }
    }

    exportToPDF() {
        const element = document.getElementById('checklist-content');
        const opt = {
            margin: 1,
            filename: 'checklist-progress.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(element).save();
    }
} 