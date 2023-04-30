import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-email-confirmation-dialog',
	standalone: true,
    imports: [NgIf, NgFor],
	template: `
		<div class="modal-header">

            <h4 class="modal-title" id="modal-title">
                An email has been sent to you
            </h4>

            <button
                type="button"
                class="btn-close" 
                (click)="activeModal.dismiss('Cross click')"
            ></button>
        </div>

        <div class="modal-body">

            <p>Confirm your email address to access this platform.</p>

            <p><strong>Make sure to check your spam folder</strong> in case you don't find the email.</p>
        </div>
	`,
})
export class EmailConfirmationDialog {
	constructor(public activeModal: NgbActiveModal) {}
}