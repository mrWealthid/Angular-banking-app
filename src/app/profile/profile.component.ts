import {Component, OnInit} from '@angular/core';
import {WebStorageService} from "../shared/services/web-storage.service";
import {DatabaseInterface} from "../shared/interface/database-interface";
import {faAt} from '@fortawesome/free-solid-svg-icons';
import {ModalService} from "../shared/services/modal.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    data: DatabaseInterface;
    faAt = faAt;
    profileForm: FormGroup;
    email: FormControl;
    // password: FormControl;
    fullName: FormControl;
    phone: FormControl;
    gender: FormControl;

    constructor(private webStorage: WebStorageService, private modalService: ModalService) {
    }

    ngOnInit(): void {
        this.data = this.webStorage.retrieveFromStorage("currentUser");
        this.fullName = new FormControl({value: this.data.fullName, disabled: true}, Validators.required);
        // this.email = new FormControl('', Validators.required);
        // this.DOB = new FormControl('', Validators.required);
        this.email = new FormControl({value: this.data.email, disabled: true}, [Validators.required, Validators.email]);
        this.gender = new FormControl(this.data.gender, Validators.required);
        this.phone = new FormControl(this.data.phone, Validators.required);
        // this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
        this.profileForm = new FormGroup({
            fullName: this.fullName,
            // DOB: this.DOB,
            email: this.email,
            gender: this.gender,
            phone: this.phone,
        });
    }

    toggleModal() {
        this.modalService.HandleShowModal();
    }
}