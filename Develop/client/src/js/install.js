const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
            console.log('User accepted the install prompt');
            deferredPrompt = null;
        if(outcome === 'accepted') {
            console.log('User accepted the install prompt');
            butInstall.style.display = 'none';
        }
        else{
            console.log('User dismissed the install prompt');
        }
    
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('installed');
});
