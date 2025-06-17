export class VersionManager {
    constructor() {
        this.loadVersion();
    }

    async loadVersion() {
        try {
            const response = await fetch('config.json');
            const config = await response.json();
            this.version = config.version;
            this.lastUpdate = config.lastUpdate;
            this.updateVersionDisplay();
        } catch (error) {
            console.error('Erreur lors du chargement de la version:', error);
            this.version = '1.0.0';
            this.lastUpdate = new Date().toISOString().split('T')[0];
            this.updateVersionDisplay();
        }
    }

    updateVersionDisplay() {
        const versionElement = document.getElementById('version-number');
        if (versionElement) {
            versionElement.textContent = this.getFormattedVersion();
        }
    }

    getVersion() {
        return this.version;
    }

    getFormattedVersion() {
        return `v${this.version}`;
    }
} 