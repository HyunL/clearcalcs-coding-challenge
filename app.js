const openDialog = () => {
    document.getElementById('confirmation-dialog').style.display = 'block';
};
const showDialogMessage = (message) => {
    document.getElementById('dialogMessage').innerText = `You just clicked '${message}'`
}


document.getElementById('body').addEventListener('dialog-confirm', () => {
    showDialogMessage('yes')
});
document.getElementById('body').addEventListener('dialog-cancel', () => {
    showDialogMessage('cancel')
});
document.getElementById('open-dialog').addEventListener('click', openDialog);
