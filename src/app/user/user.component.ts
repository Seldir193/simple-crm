import { Component, OnInit } from '@angular/core';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, collectionData  } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MatTooltipModule,DialogModule,MatCardModule,CommonModule,RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})

export class UserComponent implements OnInit {
  user = new User();
  allUsers: User[] = []; 
  constructor(public dialog: MatDialog , private firestore: Firestore  ){}

  ngOnInit(): void {
    
    const usersCollection = collection(this.firestore, 'users');
    collectionData(usersCollection, { idField: 'id'}).subscribe((changes: any) => {
      console.log('Received changes from DB', changes);
      this.allUsers = changes;
    });
  }

  openDialog(){
    this.dialog.open(DialogAddUserComponent)
  }
}