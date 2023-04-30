import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-reset-password-dialog',
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

            <p>An email containing a link to reset your password has been sent to you.</p>

            <p><strong>Make sure to check your spam folder</strong> in case you don't find the email.</p>
        </div>
	`,
})
export class ResetPasswordDialogComponent {
	constructor(public activeModal: NgbActiveModal) {}
}