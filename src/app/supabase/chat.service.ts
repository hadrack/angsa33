import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { Ichat } from '../interface/chatrespos';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private supabase!: SupabaseClient;
   public savedChat=signal({  });



  constructor() {
    this.supabase = createClient(
      environment.api,
      environment.supaBaseKey
    );
  }

  async chatMessage(text: string) {
    try {
      const { data, error } = await this.supabase.from('chat').insert({ text });
      if (error) {
        alert(error.message);
      }
      return data;
    } catch (error) {
      alert(error);
    }
 }

   async listChat(){
    try{
      const{data,error}=await this.supabase.from("chat").select('*,users(*)');
      if(error){
        alert(error.message);
      }
      
     return data;

    }catch(error){
      throw error;      
    }
   }

   async delectChat(id: string){
    const data= await.this.supabase.from('chat').delect().eq('id',id);

    return data;

   }
        
         selectedChats(msg:Ichat){
          this.savedChat.set(msg); }





}