import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Itodo } from './model/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  constructor(

  ) { }

  ngOnInit(): void {
  }
 isEDIT:boolean=false

  @ViewChild('todo') todoRef! : ElementRef<HTMLInputElement>
  todoArr:Array<Itodo>=[{
    todoItem:"Js",
    todoId:'1234'
  }]

  onAdd(todoIteControl : HTMLInputElement ):void{
   let todoObj={
    todoItem:todoIteControl.value,
    todoId:this.uuid()
   }
   console.log(todoObj);

   this.todoArr.unshift(todoObj)
  this.todoRef.nativeElement.value=''

  }

  onEdit(todoObj:Itodo):void{
    this.isEDIT=true
    let EDIT_ID=todoObj.todoId
    console.log(EDIT_ID);

    localStorage.setItem("EDIT_ID",EDIT_ID)
    this.todoRef.nativeElement.value=todoObj.todoItem
    
  }

  onUpdate(todoIteControl:HTMLInputElement):void{
    let UPDATE_ID=localStorage.getItem('EDIT_ID')

    console.log(UPDATE_ID);

    if(UPDATE_ID){
      let UPDATED_OBJ={
         todoItem:todoIteControl.value,
         todoId:UPDATE_ID
      }
      console.log(UPDATED_OBJ);
       this.todoRef.nativeElement.value=''
      let i = this.todoArr.findIndex(r=>r.todoId === UPDATE_ID)
      this.todoArr[i]=UPDATED_OBJ
      this.isEDIT=false
    }
    
  }
  onRemove(todoId:string):void{
    let getconfirm=confirm('Are you sure,You want to remove TodoItem')
   if(getconfirm){
    let REMOVE_ID=todoId

   console.log(REMOVE_ID);

   let i = this.todoArr.findIndex(r=>r.todoId === REMOVE_ID)
   this.todoArr.splice(i,1)
   }
   
  }

  uuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;
        return value.toString(16);
    
    });
  }

}
