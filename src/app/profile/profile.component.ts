import {Component, OnInit} from '@angular/core';
import {WebStorageService} from "../shared/services/web-storage.service";
import {DatabaseInterface} from "../shared/interface/database-interface";
import {faAt} from '@fortawesome/free-solid-svg-icons';
import {ModalService} from "../shared/services/modal.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {AppStateInterface, IProfile} from "../shared/interface/userAuth";
import {currentUserSelector} from "../core/store/Profile/selectors";
import {Observable} from "rxjs";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    data: IProfile| null;
    faAt = faAt;
    profileForm: FormGroup;
    email: FormControl;
    // password: FormControl;
    fullName: FormControl;
    // phone: FormControl;
    gender: FormControl;
   currentUser$: Observable<IProfile | null>;

    constructor(private store: Store<AppStateInterface>, private modalService: ModalService) {
      this.currentUser$ = this.store.pipe(select(currentUserSelector))



    }

    ngOnInit(): void {
this.currentUser$.subscribe(x => this.data = x)
        this.fullName = new FormControl({value: this.data?.name, disabled: true}, Validators.required);
        // this.email = new FormControl('', Validators.required);
        // this.DOB = new FormControl('', Validators.required);
        this.email = new FormControl({value: this.data?.email, disabled: true}, [Validators.required, Validators.email]);
        // this.gender = new FormControl(this.data.gender, Validators.required);
        // this.phone = new FormControl(this.data.phone, Validators.required);
        // this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
        this.profileForm = new FormGroup({
            fullName: this.fullName,
            // DOB: this.DOB,
            email: this.email,
            // gender: this.gender,
            // phone: this.phone,
        });
    }

    toggleModal() {
        this.modalService.HandleShowModal();
    }
}
