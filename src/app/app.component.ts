import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import{FormsModule} from '@angular/forms'
import { GeminiInteService } from './gemini-inte.service';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from './skeleton/skeleton.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,SkeletonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AIGPT';

  prompt:string='';

  loading:boolean=false;

  chatHistory:any[]=[];

  geminiService:GeminiInteService=inject(GeminiInteService);
  constructor(){
    this.geminiService.getmessageHistory().subscribe((res)=>{
      if(res){
        this.chatHistory.push(res);
      }
    })
  }

  async sendData(){
    if(this.prompt && !this.loading){
      this.loading=true;
      const data=this.prompt
      this.prompt='';
      await this.geminiService.generateText(data);
      console.log(this.prompt);
      this.loading=false;
     
    }
  }
  formatText(text:string){
    const result= text.replaceAll('*','');
    return result;
  }
}
