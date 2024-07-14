import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule} from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc,docData  } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  
  userId = '';

  user: User = new User();

  constructor(private route:ActivatedRoute,
      private firestore: Firestore,
      public dialog: MatDialog){}

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.userId = params['id']
      console.log('BOD', this.userId);
      this.getUser();
  });
  }

  getUser() {
    const userDoc = doc(this.firestore, `users/${this.userId}`);
  
    docData(userDoc).subscribe((userData: any) => {
      this.user = new User(userData);
      this.user.id = this.userId; 
      console.log('USER', this.user);
    });
  }

  editAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }
}