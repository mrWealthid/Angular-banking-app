import {Component, OnInit} from '@angular/core';
import {WebStorageService} from "../shared/services/web-storage.service";
import {DatabaseInterface} from "../shared/interface/database-interface";
import {faAt, faLock, faLockOpen, faUser, faUserEdit} from '@fortawesome/free-solid-svg-icons';
import {ModalService} from "../shared/services/modal.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {AppStateInterface, IProfile} from "../shared/interface/userAuth";
import {currentUserSelector} from "../core/store/Profile/selectors";
import {BehaviorSubject, Observable} from "rxjs";

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

   currentPassword:FormControl
  newPassword:FormControl
  confirmPassword:FormControl

   passwordForm:FormGroup

   step = new BehaviorSubject(0)

    constructor(private store: Store<AppStateInterface>, private modalService: ModalService) {
      this.currentUser$ = this.store.pipe(select(currentUserSelector))



    }

    ngOnInit(): void {
     this.updatePasswordForm()
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


    updatePasswordForm() {
      this.currentPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
      // this.email = new FormControl('', Validators.required);
      // this.DOB = new FormControl('', Validators.required);
      this.newPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
      this.confirmPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
 this.passwordForm = new FormGroup({
   passwordCurrent: this.currentPassword,
   password: this.newPassword,
   passwordConfirm:this.confirmPassword
 })

    }

    toggleModal() {
        this.modalService.HandleShowModal();
    }


    handleFormUpdate(val:any) {

     console.log('hi ')
      this.step.next(1)
    }

  previewUrl: string | ArrayBuffer | null;

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  protected readonly faUser = faUser;
  protected readonly faLock = faLock;
  protected readonly faLockOpen = faLockOpen;

  protected readonly faUserEdit = faUserEdit;
}
