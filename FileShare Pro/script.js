document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const filesList = document.getElementById('filesList');
    let isDarkMode = false;

    // Toggle theme
    function toggleTheme() {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode');
        const themeIcon = document.querySelector('.github-actions i');
        themeIcon.classList.toggle('fa-moon');
        themeIcon.classList.toggle('fa-sun');
        
        // Update color variables
        const root = document.documentElement;
        if (isDarkMode) {
            root.style.setProperty('--github-background', '#0d1117');
            root.style.setProperty('--github-text', '#c9d1d9');
            root.style.setProperty('--github-border', '#30363d');
            root.style.setProperty('--github-hover', '#161b22');
            root.style.setProperty('--github-success', '#2ea44f');
        } else {
            root.style.setProperty('--github-background', '#ffffff');
            root.style.setProperty('--github-text', '#24292e');
            root.style.setProperty('--github-border', '#d0d7de');
            root.style.setProperty('--github-hover', '#f3f4f6');
            root.style.setProperty('--github-success', '#28a745');
        }
    }

    // Generate random URL for files
    function generateRandomURL() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < 12; i++) {
            randomString += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return `https://fileshare.pro/${randomString}`;
    }

    // Handle file upload
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const file = fileInput.files[0];
        if (!file) {
            showToast('الرجاء اختيار ملف أولاً', 'error');
            return;
        }

        // Simulate file upload
        try {
            const randomURL = generateRandomURL();
            
            // Add file to the list
            addFileToList(file.name, randomURL);
            
            // Show success message
            showToast('تم رفع الملف بنجاح!', 'success');
        } catch (error) {
            showToast('حدث خطأ أثناء رفع الملف', 'error');
        }
    });

    // Add file to the list
    function addFileToList(fileName, fileURL) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-name">${fileName}</div>
            <div class="file-actions">
                <a href="${fileURL}" class="file-link" target="_blank">رابط الملف</a>
                <button class="github-btn secondary" onclick="copyToClipboard('${fileURL}')">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        `;
        filesList.insertBefore(fileItem, filesList.firstChild);
    }

    // Copy URL to clipboard
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('تم نسخ الرابط إلى الحافظة!', 'success');
        }).catch(err => {
            showToast('حدث خطأ أثناء نسخ الرابط', 'error');
        });
    }

    // Download file
    function downloadFile() {
        const url = document.getElementById('downloadUrl').value;
        if (!url) {
            showToast('الرجاء إدخال رابط الملف', 'error');
            return;
        }

        // Simulate file download
        window.location.href = url;
    }

    // Show toast message
    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
});
