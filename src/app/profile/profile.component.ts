import {Component, inject, OnInit} from '@angular/core';
import {faUserEdit} from '@fortawesome/free-solid-svg-icons';
import {ModalService} from "../shared/services/modal.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {AppStateInterface, IProfile} from "../shared/interface/userAuth";
import {currentUserSelector, isLoading} from "../core/store/Profile/selectors";
import {Observable} from "rxjs";
import * as profileActions from "../core/store/Profile/actions"
import {ProfileService} from "./service/profile.service";
import * as dayjs from "dayjs";
import {selectOptions} from "../shared/inputs/select-input/select-input.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  data: IProfile | null;
  profileForm: FormGroup;
  email: FormControl;
  role: FormControl;
  name: FormControl;
  photo: FormControl;
  dob: FormControl;
  currentUser$: Observable<IProfile | null>;
  currentPassword: FormControl
  newPassword: FormControl
  confirmPassword: FormControl
  passwordForm: FormGroup
  previewUrl: string | ArrayBuffer | null;
  options: selectOptions[] = [
    {id: "user", name: 'User'},
    {id: "admin", name: 'Admin'},
  ];
  loading: Boolean;

  protected readonly faUserEdit = faUserEdit;
  protected readonly isLoading = isLoading;
  private image: any;

  //injected services
  private store = inject(Store<AppStateInterface>)
  private modalService = inject(ModalService)

  protected profileService = inject(ProfileService)

  constructor() {
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
    this.store.pipe(select(isLoading)).subscribe(x => this.loading = x)


  }

  ngOnInit(): void {
    this.currentUser$.subscribe(x => this.data = x)
    this.detailsForm()
    this.updatePasswordForm()


  }

  detailsForm() {
    this.name = new FormControl({value: this.data?.name, disabled: false}, Validators.required);
    this.email = new FormControl({value: this.data?.email, disabled: true}, [Validators.required, Validators.email]);
    this.photo = new FormControl("");
    this.dob = new FormControl({value: dayjs(this.data?.dateOfBirth), disabled: true}, Validators.required);
    this.role = new FormControl({value: this.data?.role, disabled: false}, Validators.required);
    this.profileForm = new FormGroup({
      name: this.name,
      role: this.role,
      email: this.email,
      photo: this.photo,
      dob: this.dob

    });
  }

  updatePasswordForm() {
    this.currentPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);

    this.newPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.confirmPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.passwordForm = new FormGroup({
      passwordCurrent: this.currentPassword,
      password: this.newPassword,
      passwordConfirm: this.confirmPassword
    })

  }

  onSelectionChange(selectedItems: any[]): void {
    console.log(selectedItems);
    // Handle selected items
  }

  toggleModal() {
    this.modalService.HandleShowModal();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.image = file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }


  }

  handlePasswordUpdate(val: any) {
    this.store.dispatch(profileActions.profilePasswordUpdate(val))
    // const self = this
    // console.log(val)
    // this.profileService.updatePassword(val).subscribe({
    //   next(x) {
    //     self.profileService.updateSteps(2)
    //   },
    //   error(err) {
    //     console.error('something wrong occurred: ' + err);
    //   },
    //   complete() {
    //     console.log('done')
    //   },
    // });
  }

  handlePersonalFormUpdate(val: any) {
    const payload: IProfile = {...val, photo: this.image}
    this.store.dispatch(profileActions.profileUpdate(payload))
  }

  handleBack() {
    this.profileService.updateSteps(0)
    this.photo.patchValue('')
  }
}
