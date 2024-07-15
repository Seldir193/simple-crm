import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule  } from '@angular/forms';
import { User } from '../../models/user.class';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    FormsModule,
    MatProgressBarModule,
    CommonModule
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent implements OnInit {
  loading = false;
  user: User = new User();
  birthDate: Date = new Date();
  userId: string = '' ;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent> ,private firestore: Firestore  ){}

  ngOnInit(): void {
    this.user.birthDate = this.birthDate;
  }

  saveUser(){
    this.loading = true;
    if(this.userId){
    const userDoc = doc(this.firestore, `users/${this.userId}`);
    updateDoc(userDoc, this.user.toJSON())
      .then(() => {
        console.log('User updated successfully!');
        this.loading = false;
        this.dialogRef.close(true);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        this.loading = false;
        this.dialogRef.close(false);
      });
    
  }
}
}


  



