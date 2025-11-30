import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importante para navegação
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem,
  IonLabel, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircle, people, cloud } from 'ionicons/icons';

import { Api, Usuario } from 'src/app/services/api';
import { FirebaseService, Contact } from 'src/app/services/firebase';

@Component({
  selector: 'app-listar-contatos',
  standalone: true,
  templateUrl: './listar-contatos.page.html',
  styleUrls: ['./listar-contatos.page.scss'],
  imports: [
    CommonModule, RouterModule, // RouterModule aqui
    IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem,
    IonLabel, IonButton, IonIcon
  ],
})
export class ListarContatosPage implements OnInit {
  usuariosApi: Usuario[] = [];
  contatosFirebase: Contact[] = [];

  constructor(
    private api: Api,
    private firebaseService: FirebaseService
  ) {
    addIcons({ addCircle, people, cloud });
  }

  ngOnInit() {
    this.carregarUsuariosApi();
    this.carregarContatosFirebase();
  }

  carregarUsuariosApi() {
    this.api.getUsuarios().subscribe(dados => this.usuariosApi = dados);
  }

  carregarContatosFirebase() {
    this.firebaseService.listarContatos().subscribe(contatos => this.contatosFirebase = contatos);
  }
}
