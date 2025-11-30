import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Para o routerLink funcionar
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonItem,
  IonLabel, IonInput, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { list, save } from 'ionicons/icons';

import { FirebaseService, Contact} from 'src/app/services/firebase';

@Component({
  selector: 'app-adicionar-contato',
  templateUrl: './adicionar-contato.page.html',
  styleUrls: ['./adicionar-contato.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule, // Import essencial
    IonContent, IonHeader, IonTitle, IonToolbar, IonItem,
    IonLabel, IonInput, IonButton, IonIcon
  ],
})
export class AdicionarContatoPage {
  contato: Contact = {
    nome: '',
    email: '',
  };

  constructor(private firebaseService: FirebaseService) {
    addIcons({ list, save });
  }

  salvar() {
    if (!this.contato.nome || !this.contato.email) {
      alert('Preencha nome e e-mail');
      return;
    }

    this.firebaseService
      .adicionarContato(this.contato)
      .then(() => {
        alert('Contato salvo com sucesso!');
        this.contato = { nome: '', email: '' }; // Limpa o formulário
      })
      .catch((err) => {
        console.error(err);
        alert('Erro ao salvar contato');
      });
  }
}
