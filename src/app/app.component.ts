import { Component,inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Firestore,collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  items$: Observable<any[]>;
  firestore: Firestore = inject(Firestore);
  title = 'simple-crm';

  constructor(){
    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);
  }
}


