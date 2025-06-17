import { VersionManager } from './version-manager.js';

export class ExportManager {
    constructor() {
        this.versionManager = new VersionManager();
        this.init();
    }

    init() {
        const exportBtn = document.querySelector('.export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportToPDF());
        }
    }

    async exportToPDF() {
        console.log('Début de l\'export PDF...');
        const main = document.querySelector('main');
        const exportBtn = document.querySelector('.export-btn');
        
        if (!main || !exportBtn) {
            console.error('Éléments requis non trouvés');
            return;
        }

        const content = main.cloneNode(true);
        
        const versionElement = document.getElementById('version-number');
        const version = versionElement ? versionElement.textContent : '';
        
        const header = document.createElement('div');
        header.className = 'pdf-header';
        header.innerHTML = `
            <h1>Checklist CDA 6</h1>
            <p>${version}</p>
            <p>Date d'export : ${new Date().toLocaleDateString('fr-FR')}</p>
        `;
        content.insertBefore(header, content.firstChild);

        const items = content.querySelectorAll('.item');
        items.forEach(item => {
            const isChecked = item.querySelector('input[type="checkbox"]').checked;
            const isVisible = !item.classList.contains('hidden');
            
            if (!isChecked || !isVisible) {
                item.style.display = 'none';
            }
        });

        const options = {
            margin: [0.5, 0.5, 0.5, 0.5],
            filename: 'checklist-progress.pdf',
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
            pagebreak: { 
                mode: ['avoid-all', 'css', 'legacy'],
                before: '.item',
                avoid: ['h1', 'h2', 'h3', 'table', 'img']
            }
        };

        try {
            console.log('Configuration html2pdf...');
            await html2pdf().set(options).from(content).save();
            console.log('Export PDF terminé avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'export PDF:', error);
            alert('Une erreur est survenue lors de l\'export PDF. Veuillez réessayer.');
        }
    }
} 