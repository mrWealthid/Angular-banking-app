import {Component, OnInit} from '@angular/core';
import {faAt, faLock, faLockOpen, faUser, faUserEdit} from '@fortawesome/free-solid-svg-icons';
import {ModalService} from "../shared/services/modal.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {AppStateInterface, IProfile} from "../shared/interface/userAuth";
import {currentUserSelector} from "../core/store/Profile/selectors";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  data: IProfile | null;
  faAt = faAt;
  profileForm: FormGroup;
  email: FormControl;
  role: FormControl;
  name: FormControl;
  // phone: FormControl;
  photo: FormControl<File | string | null>;
  currentUser$: Observable<IProfile | null>;

  currentPassword: FormControl
  newPassword: FormControl
  confirmPassword: FormControl

  passwordForm: FormGroup

  step = new BehaviorSubject(0)
  previewUrl: string | ArrayBuffer | null;
  options = [
    {id: 1, name: 'Option 1'},
    {id: 2, name: 'Option 2'},
    {id: 3, name: 'Option 3'}
  ];
  protected readonly faUser = faUser;
  protected readonly faLock = faLock;
  protected readonly faLockOpen = faLockOpen;
  protected readonly faUserEdit = faUserEdit;
  private image: any;

  constructor(private store: Store<AppStateInterface>, private modalService: ModalService, private authService: AuthService) {
    this.currentUser$ = this.store.pipe(select(currentUserSelector))


  }

  ngOnInit(): void {
    this.currentUser$.subscribe(x => this.data = x)
    this.detailsForm()
    this.updatePasswordForm()

  }

  detailsForm() {
    this.name = new FormControl({value: this.data?.name, disabled: true}, Validators.required);
    // this.email = new FormControl('', Validators.required);
    // this.DOB = new FormControl('', Validators.required);
    this.email = new FormControl({value: this.data?.email, disabled: true}, [Validators.required, Validators.email]);
    this.photo = new FormControl('');
    this.role = new FormControl(this.data?.role, Validators.required);
    // this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.profileForm = new FormGroup({
      name: this.name,
      role: this.role,
      email: this.email,
      photo: this.photo,
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
    // this.photo.setValue(file.name)
    // console.log(file)

    this.image = file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }


  }

  updateSteps(val: number): void {
    return this.step.next(val)
  }

  handlePasswordUpdate(val: any) {
    const self = this
    console.log(val)
    this.authService.updatePassword(val).subscribe({
      next(x) {
        self.updateSteps(2)
      },
      error(err) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('done')
      },
    });
  }


  handleFormUpdate(val: any) {
    const formData = new FormData()
    formData.append('name', this.name.value)
    formData.append('email', this.email.value)
    formData.append('photo', this.image)


    const self = this

    this.authService.updateUser(formData).subscribe({
      next(x) {
        self.updateSteps(1)
      },
      error(err) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('done')
      },
    });
  }


}
