import { Component, OnInit } from '@angular/core';
import { WinnerService } from '../winner.service';

@Component({
  selector: 'app-winnerdetail',
  templateUrl: './winnerdetail.component.html',
  styleUrls: ['./winnerdetail.component.css']
})
export class WinnerdetailComponent implements OnInit {
   winners={
     name:'',
     email:'',
     cellno:''

   };
   submitted= false;
  constructor(private winnerservice:WinnerService) { }

  ngOnInit(): void {
  }
  saveDetail() {
    const data = {
      name: this.winners.name,
      email: this.winners.email,
      cellno:this.winners.cellno
    };

    this.winnerservice.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

}
