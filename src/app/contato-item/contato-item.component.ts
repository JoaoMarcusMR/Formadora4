// src/app/contato-item/contato-item.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
// Importamos a interface do FirebaseService para tipagem
import { Contact } from '../services/firebase'; 

@Component({
  selector: 'app-contato-item',
  templateUrl: './contato-item.component.html',
  styleUrls: ['./contato-item.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ContatoItemComponent implements OnInit {

  // Recebe o objeto de contato da página pai
  @Input() contact!: Contact; 

  constructor() { }

  ngOnInit() {
    // Você pode adicionar lógica aqui para inicialização
  }

}