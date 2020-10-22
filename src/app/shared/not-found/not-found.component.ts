import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../common/authentication.service';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
constructor(private authenticationService: AuthenticationService,private router: Router) { }
  ngOnInit(): void {
    const user = this.authenticationService.userValue;
    if(user) { 
     this.router.navigate(['/not-found']);
    } else { 
   this.router.navigate(['/login']);
    }
  }

}
