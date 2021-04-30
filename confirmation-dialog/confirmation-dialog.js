const template = document.createElement('template');
template.innerHTML = `
    <style>
        .dialog {
          position: fixed; /* Stay in place */
          z-index: 1; /* Sit on top */
          left: 0;
          top: 0;
          width: 100%; /* Full width */
          height: 100%; /* Full height */
          overflow: auto; /* Enable scroll if needed */
          background-color: rgb(0,0,0); /* Fallback color */
          background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }
        
        .dialog-content {
          background-color: #fefefe;
          margin: 15% auto; /* 15% from the top and centered */
          padding: 20px;
          border: 1px solid #888;
          width: fit-content;
        }
    </style>

    <div class="dialog">
        <div class="dialog-content">
            <div class="dialog-body">
                <slot name="body"><slot>
            </div>
            <button id="yes">Yes</button>
            <button id="cancel">Cancel</button>
        </div>
    </div>
    `;

class ConfirmationDialog extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    yesListener = () => {
        this.dispatchEvent(new Event('dialog-confirm', { bubbles: true }));
        this.style.display = "none";
    };

    cancelListener = () => {
        this.dispatchEvent(new Event('dialog-cancel', { bubbles: true }));
        this.style.display = "none";
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#yes').addEventListener('click', this.yesListener)
        this.shadowRoot.querySelector('#cancel').addEventListener('click', this.cancelListener)
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#yes').removeEventListener('click', this.yesListener);
        this.shadowRoot.querySelector('#cancel').removeEventListener('click', this.cancelListener);
    }
}



customElements.define('confirmation-dialog', ConfirmationDialog);
