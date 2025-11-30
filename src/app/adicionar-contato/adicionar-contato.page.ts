// src/app/adicionar-contato/adicionar-contato.page.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { IonicModule } from '@ionic/angular';
import { FirebaseService, Contact } from '../services/firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adicionar-contato',
  templateUrl: './adicionar-contato.page.html',
  styleUrls: ['./adicionar-contato.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AdicionarContatoPage implements OnInit {

  newContact: Contact = { nome: '', email: '' };

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {}

  saveContact() {
    this.firebaseService.addContact(this.newContact)
      .then(() => {
        console.log('Contato salvo com sucesso!');
        this.router.navigateByUrl('/listar-contatos');
      })
      .catch(error => {
        console.error('Erro ao salvar contato:', error);
      });
  }
}