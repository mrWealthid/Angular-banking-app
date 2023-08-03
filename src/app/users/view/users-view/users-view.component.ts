import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent {
  usersDetails$: Observable<any>
  userService = inject(UserService)
  loading:boolean= false
  router= inject(Router)
  route = inject( ActivatedRoute)
  

constructor() {
  const id =  this.route.snapshot.params['id']
 this.usersDetails$ = this.userService.getUser(id)
  }
  handleBack() {
    this.router.navigate(['/dashboard/users'])
        }
}
