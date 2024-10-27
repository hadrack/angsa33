import { Component, effect, inject, signal } from '@angular/core';
import { ChatService } from '../../supabase/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delect-modal',
  standalone: true,
  imports: [],
  templateUrl: './delect-modal.component.html',
  styleUrl: './delect-modal.component.css'
})
export class DelectModalComponent {
private chat_service=inject(ChatService);
private router=inject(Router);
 dismiss =  signal(false) //contion for delect in htm when the button is click and it rigth  it will set it to true


constructor(){
  effect(()=>{
    console.log(this.chat_service.savedChat());
  });
}
delectChat(){
  const id=(this.chat_service.savedChat()as{id:string}).id; 

  console.log(id);

  //anominos function
this.chat_service.delectChat(id).then(()=>{

  //conect rout...also get rid of the modal and make sure user has lastest data from supabase without refreshing it pages 
let currentUlr=this.router.url;

this.dismiss.set(true);// acces the dissmis 

this.router.navigateByUrl('/',{skipLocationChange:true  }).then(()=>{
  this.router.navigate([])

});
 
}).catch((error)=>{
  console.log();
  alert(error.message);
}
);

}


}
