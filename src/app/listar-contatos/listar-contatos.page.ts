// src/app/listar-contatos/listar-contatos.page.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { IonicModule } from '@ionic/angular'; 
// Importa o componente filho
import { ContatoItemComponent } from '../contato-item/contato-item.component'; 
// Importa o FirebaseService e a interface Contact (Ajustado para seu nome de arquivo: firebase)
import { FirebaseService, Contact } from '../services/firebase'; 

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.page.html',
  styleUrls: ['./listar-contatos.page.scss'],
  standalone: true,
  // Adiciona o componente filho e outros módulos necessários
  imports: [IonicModule, CommonModule, FormsModule, ContatoItemComponent] 
})
export class ListarContatosPage implements OnInit {

  contacts: Contact[] = []; 

  constructor(private firebaseService: FirebaseService) { } 

  ngOnInit() {
    this.loadContacts();
  }

  // Método que se inscreve no Observable do Firebase para receber a lista em tempo real
  loadContacts() {
    this.firebaseService.getContacts().subscribe(
      (data) => {
        this.contacts = data; 
        console.log('Contatos do Firebase carregados:', data);
      },
      (error) => {
        console.error('Erro ao buscar contatos:', error);
      }
    );
  }
}