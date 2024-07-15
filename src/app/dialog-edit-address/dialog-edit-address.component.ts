import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule  } from '@angular/forms';
import { User } from '../../models/user.class';
import { Firestore,doc,updateDoc} from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatNativeDateModule,MatDatepickerModule,MatButtonModule,FormsModule,MatProgressBarModule,CommonModule],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})

export class DialogEditAddressComponent implements OnInit {
  loading = false;
  user: User = new User();
  userId: string = '';
  
  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>,private firestore: Firestore) {}

  ngOnInit(): void {
    
  }

  saveUser() {
    this.loading = true;
    if(this.userId){
    const userDoc = doc(this.firestore, `users/${this.userId}`); 
    updateDoc(userDoc, this.user.toJSON()) 
      .then(() => {
        console.log('User updated successfully!');
        this.loading = false;
        this.dialogRef.close(true);  })
      .catch((error) => {
        console.error('Error updating user: ', error);
        this.loading = false;
        this.dialogRef.close(false); 
      });
  }
}
}

