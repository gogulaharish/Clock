import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css'
})
export class ClockComponent implements OnInit {

  second = 0;
  minute = 0;
  hour = 0;
  time = new Date();
  isBrowser = signal(false);
  dSec = '';
  dMin = '';
  dHr = '';
  dHrs = 0;
  tStatus = 'AM';
  isPlay = false;
  hr: any = '0'+ 0;
  min: any = '0'+ 0;
  sec: any = '0'+ 0;
  ms: any = '0'+ 0;

  startTimer: any;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  ngOnInit() {
    if (this.isBrowser()) {
      setInterval(() => {
        this.time = new Date();
        this.second = this.time.getSeconds()*6;
        this.minute = this.time.getMinutes()*6;
        this.hour = this.time.getHours() * 30 + Math.round(this.minute / 12);

        if(this.time.getSeconds()<10){
          this.dSec= this.time.getSeconds().toString().padStart(2,'0');
        }
        else{
          this.dSec = this.time.getSeconds().toString();
        }

        if(this.time.getMinutes()<10){
          this.dMin= this.time.getMinutes().toString().padStart(2,'0');
        }
        else{
          this.dMin = this.time.getMinutes().toString();
        }

        if(this.time.getHours()<10){
          this.dHr= this.time.getHours().toString().padStart(2,'0');
        }
        else{
          this.dHr= this.time.getHours.toString();
        }

        if(this.time.getHours()>12){
          this.tStatus = 'PM';
          this.dHrs = this.time.getHours() - 12;
          if(this.dHrs<10){
            this.dHr = this.dHrs.toString().padStart(2,'0');
          }else{
            this.dHr = this.dHrs.toString();
          }
          // this.dHr = (this.time.getHours() - 12).toString();
        }else{
          this.dHr = this.time.getHours().toString();
        }

      }, 1000);
    }
  }

  playClock(){
    this.isPlay = !this.isPlay;
    if(this.isBrowser()){
    this.startTimer = setInterval(()=>{
      this.ms++;
      this.ms = this.ms < 10 ? '0' + this.ms : this.ms;
      if(this.ms === 100 ){
        this.sec++;
        this.sec = this.sec < 10 ? '0' + this.sec : this.sec;
        this.ms = '0'+0;
      }
      if(this.sec === 60){
        this.min++;
        this.min = this.min < 10 ? '0' + this.min : this.min;
        this.sec = '0'+0;
      }
      if(this.min === 60){
        this.hr++;
        this.hr = this.hr < 10 ? '0' + this.hr : this.hr;
        this.min = '0'+0;
      }
      
    },10);
  }
  }

  pauseClock(){
    this.isPlay = !this.isPlay;
    clearInterval(this.startTimer);
  }

  reset(){
    this.hr = this.min = this.sec = this.ms = '0' + 0;
  }

}
