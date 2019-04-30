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
  percent:any;
  count = 0;
  question={};
  width_percent:any;
  mainCount=0;
  totalSections:any;
  nextDisabled=false;
  previousDisabled=false;


  constructor(private hraService: MyAhyushHraService) { };
  ngOnInit() {
    this.getDataFromAhyush();
  }
  getDataFromAhyush() {
    this.hraService.getAhyushJson().subscribe(data => {
      this.getData = data;
      // this.getActivites('SDGR');
      this.totalSections=this.getData.sections.length;
      console.log("totalsections",this.getData.sections);
      this.activity=this.getData['sections'][this.mainCount];
    this.percent= (100/this.activity.questions.length);
    this.width_percent=this.percent;
    console.log(this.width_percent);
    document.getElementById('pbar').style.width=this.width_percent+'%';
    document.getElementById(`${this.mainCount}`).style.backgroundColor='red';
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
    console.log(this.count);
    this.nextDisabled=false;
    //  console.log("before",this.getData.sections[this.count]['questions']);
    // this.getData.sections[this.count].questions[this.count-1]=this.question;
    //  console.log("after",this.getData.section[this.count]['questions']);
    if(this.count<=this.activity.questions.length-1 && this.count>=0){
    this.question=this.activity.questions[this.count];
    this.width_percent-=this.percent;
    document.getElementById('pbar').style.width=this.width_percent+'%';
   }else{
   this.mainCount--;
     if(this.mainCount>=0){
    document.getElementById(`${this.mainCount}`).style.backgroundColor='red';
      this.activity=this.getData['sections'][this.mainCount];
      this.percent=0;
      this.percent=100/this.activity.questions.length-1;
      this.count=this.activity.questions.length-1;
      this.width_percent=100;
      document.getElementById('pbar').style.width=this.width_percent+'%';
      this.question=this.activity.questions[this.count];
     }else{
       this.count=0;
       this.previousDisabled=true;
     }
   }
  }
    
     
 
   nxtQuestion(){
     this.count++;
     this.previousDisabled=false;
    //  console.log("before",this.getData.sections[this.count]['questions']);
    // this.getData.sections[this.count].questions[this.count-1]=this.question;
    //  console.log("after",this.getData.section[this.count]['questions']);
    if(this.count<=this.activity.questions.length-1){
      this.width_percent+=this.percent;
      document.getElementById('pbar').style.width=this.width_percent+'%';
    this.question=this.activity.questions[this.count];
   }else{
    this.mainCount<=-1?this.mainCount=1: this.mainCount++;
     if(this.totalSections-1 >= this.mainCount){
    document.getElementById(`${this.mainCount}`).style.backgroundColor='red';
    document.getElementById(`${this.mainCount-1}`).style.backgroundColor='green';
     this.count=0; this.percent=0;this.width_percent=0;
    this.activity=this.getData['sections'][this.mainCount];
    this.percent= (100/this.activity.questions.length);
      this.width_percent=this.percent;
      document.getElementById('pbar').style.width=this.width_percent+'%';
    this.question=this.activity.questions[this.count];
  }else{
    this.count--
    this.nextDisabled=true;
  }
   }
   }
}
