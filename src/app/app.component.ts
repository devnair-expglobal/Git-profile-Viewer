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
  tagName = ``;
  loader: boolean;
  dataAvailable: boolean = false;
  profile;
  stringData = '';
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.loader = false;

  }

  getProfile(username) {
    this.loader = true;
    this.dataAvailable = false;
    if (localStorage.getItem(username) != null) {
      this.profile = JSON.parse(localStorage.getItem(username));
      this.dataAvailable = true;
      this.loader = false;
      this.tagName = null;
      console.log('from local storage');
    } else {
      this.tagName = null;
      // tslint:disable-next-line: max-line-length
      this.httpClient.get('https://api.github.com/users/' + username).subscribe(res => {
        this.profile = res;
        this.loader = false;
        this.dataAvailable = true;
        this.stringData = JSON.stringify(this.profile);
        localStorage.setItem(username, this.stringData);
      }, () => {
        this.loader = false;
        this.profile = {};
        this.username = '';
        this.tagName = 'NO DATA TO DISPLAY';
        this.toastr.error('User Not Found', '', { timeOut: 3000 });
      }
      );
    }
  }
}
