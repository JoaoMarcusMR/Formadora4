import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // ActivatedRoute para pegar ID
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonItem,
  IonLabel, IonInput, IonButton, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { list, save, trash } from 'ionicons/icons';

import { FirebaseService, Contact } from 'src/app/services/firebase';
import { ToastController } from '@ionic/angular'; // <-- ADICIONE ESTE IMPORT

@Component({
  selector: 'app-adicionar-contato',
  templateUrl: './adicionar-contato.page.html',
  styleUrls: ['./adicionar-contato.page.scss'],
  standalone: true,
  imports: [
  CommonModule, FormsModule, RouterModule,
  IonContent, IonHeader, IonTitle, IonToolbar, IonItem,
  IonLabel, IonInput, IonButton, IonIcon
],

})

export class AdicionarContatoPage implements OnInit {
  contato: Contact = {
    nome: '',
    email: '',
    
    
  };

  isEdicao = false; // Controla se é cadastro novo ou edição

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private toastCtrl: ToastController // <-- ADICIONE A INJEÇÃO AQUI
   
  ) {
    addIcons({ list, save, trash });
  }

  async ngOnInit() {
    // Verifica se existe um ID na URL
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdicao = true;
      const contatoEncontrado = await this.firebaseService.obterContato(id);
      if (contatoEncontrado) {
        this.contato = contatoEncontrado;
      }
    }
  }

  salvar() {
    if (!this.contato.nome || !this.contato.email) return;

    if (this.isEdicao) {
      // MODO EDIÇÃO
      this.firebaseService.editarContato(this.contato)
        .then(() => {
          alert('Contato atualizado!');
          this.router.navigate(['/listar-contatos']);
        })
        .catch(err => console.error(err));
    } else {
      // MODO CRIAÇÃO
      this.firebaseService.addContact(this.contato)
        .then(() => {
          alert('Contato criado!');
          this.router.navigate(['/listar-contatos']);
        })
        .catch(err => console.error(err));
    }
  }

  excluir() {
    if (!this.contato.id) return;

    // Confirmação simples
    if (confirm('Tem certeza que deseja excluir este contato?')) {
      this.firebaseService.excluirContato(this.contato.id)
        .then(() => {
          this.router.navigate(['/listar-contatos']);
        })
        .catch(err => console.error(err));
    }
  }
}
