import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gitSearch';
  username = '';
  tagName: any;
  loader: boolean;
  profile = {};
  stringData = '';
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {
  }
  
  ngOnInit() {
    this.loader = false;

  }

  getProfile(username) {
    this.loader = true;
    if (localStorage.getItem(username) != null) {
      this.profile = JSON.parse(localStorage.getItem(username));
      this.loader = false;
      this.tagName = null;
      // this.username = '';
      console.log('from local storage');
    } else {
      this.tagName = null;
      // tslint:disable-next-line: max-line-length
      this.httpClient.get('https://api.github.com/users/' + username + '?access_token=c47cc024ed3ed105c593feceb10c627b310809fd').subscribe( res => {
        this.profile = res;
        this.loader = false;
        // this.username = '';
        this.stringData = JSON.stringify(this.profile);
        localStorage.setItem(username, this.stringData);
        console.log(res);
      },  () => {
          this.loader = false;
          this.profile = {};
          this.username = '';
          this.tagName = 'NO DATA TO DISPLAY';
          this.toastr.error('User Not Found', '', {timeOut: 3000});
          // alert('user not found');
          console.log('ftchda ufbvoiwu');
        }
      );
    }
  }
        // else {
          //   this.loader = false;
          // }
          // tslint:disable-next-line: max-line-length
}
