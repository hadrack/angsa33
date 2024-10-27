import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'; // Removed unused import
import { Ichat } from '../../interface/chatrespos';
import { ChatService } from '../../supabase/chat.service';
import { DelectModalComponent } from '../../layout/delect-modal/delect-modal.component';
// // Added ChatService import

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe,DelectModalComponent],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  private auth = inject(AuthService);
  private chatService = inject(ChatService); // Changed to inject ChatService
  private router = inject(Router);
  private fb = inject(FormBuilder);
  chat = signal<Ichat[]>([]); // Fixed signal type declaration

  chatForm!: FormGroup;

  constructor() {
    this.chatForm = this.fb.group({
      chat_message: ['', Validators.required]
    });
  }

  effect = () => {
    this.onListChat();
  }

  async logOut() {
    try {
      await this.auth.signOut();
      this.router.navigate(['/login']);
    } catch (error: any) {
      alert(error.message);
    }
  }

  onSubmit() {
    const formValue = this.chatForm.value.chat_message; // Fixed variable name
    console.log(formValue);
    
    this.chatService['chatMessage'](formValue).then((response: any) => { // Fixed variable name
      console.log(response);
      this.chatForm.reset(); // Reset form
      this.onListChat();
    }).catch((error: { message: any; }) => {
      alert(error.message);
    });
  }

  onListChat() {
    this.chatService['listChat']().then((response: Ichat[] | null) => {
      console.log(response);
      if (response !== null) {
        this.chat.set(response); // Fixed variable name
      } else {
        console.log("No message Found");

        
      }
    }).catch((error: { message: any; }) => {
      alert(error.message);
    });
  }

//dropdown that show the delect text

openDropDown(msg:Ichat){
console.log(msg);

this.chatService.selectedChats(msg)

        
}


}