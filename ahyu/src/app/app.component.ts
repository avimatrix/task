import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyAhyushHraService } from './services/my-ahyush-hra.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  getData: any
  activity: any={} ;
  isSection1:boolean =true
  btn:boolean;
  count = 0;
question={};
mainCount=0;


  constructor(private hraService: MyAhyushHraService) { };
  ngOnInit() {
    this.getDataFromAhyush();
  }
  getDataFromAhyush() {
    this.hraService.getAhyushJson().subscribe(data => {
      this.getData = data;
      // this.getActivites('SDGR');
      this.activity=this.getData['sections'][this.mainCount];
      this.question=this.activity.questions[this.count];
    }, (err) => {
      console.log(err);

    });
  };

  //get all hra code data
  // getActivites(type) {
    
  //   this.activity = this.getData.sections.filter(data => data.code == type)[0]
  // console.log(this.getData);
  
  //   console.log(this.activity);
  //   this.question=this.activity.questions[this.count];
  // };
  
  prevQuestion(i){
    this.count--;
    //  console.log("before",this.getData.sections[this.count]['questions']);
    // this.getData.sections[this.count].questions[this.count-1]=this.question;
    //  console.log("after",this.getData.section[this.count]['questions']);
    if(this.count<=this.activity.questions.length-1){
    this.question=this.activity.questions[this.count];
   }else{
     this.mainCount--
     this.count=0;
    this.activity=this.getData['sections'][this.mainCount];
    this.question=this.activity.questions[this.count];
   }
  }
    
     
 
   nxtQuestion(){
     this.count++;
    //  console.log("before",this.getData.sections[this.count]['questions']);
    // this.getData.sections[this.count].questions[this.count-1]=this.question;
    //  console.log("after",this.getData.section[this.count]['questions']);
    if(this.count<=this.activity.questions.length-1){
    this.question=this.activity.questions[this.count];
   }else{
     this.mainCount++
     this.count=0;
    this.activity=this.getData['sections'][this.mainCount];
    this.question=this.activity.questions[this.count];
   }
  }


}
