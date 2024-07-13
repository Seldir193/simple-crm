import { Component,inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule  } from '@angular/forms';
import { User } from '../../models/user.class';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatNativeDateModule,MatDatepickerModule,MatButtonModule,FormsModule,MatProgressBarModule,CommonModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})


export class DialogAddUserComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  user: User = new User();
  birthDate: Date = new Date();
  loading = false;

  ngOnInit(): void {
  
  }

  saveUser() {
    this.user.birthDate = this.birthDate;
    console.log('Current user is',this.user);
    this.loading = true;
    const usersCollection = collection(this.firestore, 'users');
    addDoc(usersCollection, this.user.toJSON()).then(() => {
      this.loading = false;
      console.log('User added successfully');
    }).catch(error => {
      this.loading = false;
      console.error('Error adding user: ', error);
    });
  }
}








