document.addEventListener('DOMContentLoaded', function() {
    // Language switcher
    const languageDropdown = document.getElementById('languageDropdown');
    if (languageDropdown) {
        languageDropdown.addEventListener('change', function() {
            const lang = this.value;
            localStorage.setItem('language', lang);
            window.location.reload();
        });
    }

    // Form submission handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري المعالجة...';

            // Add CSRF token if exists
            const csrfToken = document.querySelector('input[name="csrf_token"]');
            if (csrfToken) {
                this.append(csrfToken.cloneNode(true));
            }

            fetch(this.action, {
                method: 'POST',
                body: new FormData(this)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if (data.redirect) {
                        window.location.href = data.redirect;
                    } else {
                        // Show success message
                        alert(data.message);
                    }
                } else {
                    // Show error message
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'alert alert-danger';
                    errorDiv.textContent = data.message;
                    this.insertBefore(errorDiv, this.firstChild);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('حدث خطأ أثناء المعالجة');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
        });
    });

    // Auto-focus first input
    const firstInput = document.querySelector('input[type="text"]:not([type="hidden"]), input[type="email"]:not([type="hidden"])');
    if (firstInput) {
        firstInput.focus();
    }
});
