import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
  updateDoc,
  getDoc
} from '@angular/fire/firestore'; // Importações adicionais
import { Observable } from 'rxjs';

export interface Contact {
  id?: string;
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private colecaoContatos = 'contatos';

  constructor(private firestore: Firestore) {}

  /* --- CREATE --- */
  addContact(contato: Contact) {
    const contatosRef = collection(this.firestore, this.colecaoContatos); 
    return addDoc(contatosRef, contato);
  }

  /* --- READ (Lista) --- */
  listarContatos(): Observable<Contact[]> {
    const contatosRef = collection(this.firestore, this.colecaoContatos);
    return collectionData(contatosRef, { idField: 'id' }) as Observable<Contact[]>;
  }

  /* --- READ (Único - para preencher o form na edição) --- */
  async obterContato(id: string) {
    const contatoRef = doc(this.firestore, this.colecaoContatos, id);
    const snap = await getDoc(contatoRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as Contact;
    } else {
      return null;
    }
  }

  /* --- UPDATE --- */
  editarContato(contato: Contact) {
    const contatoRef = doc(this.firestore, this.colecaoContatos, contato.id!);
    // Desestruturamos para não enviar o ID como campo de dados, apenas referência
    const { id, ...dados } = contato;
    return updateDoc(contatoRef, dados as any);
  }

  /* --- DELETE --- */
  excluirContato(id: string) {
    const contatoRef = doc(this.firestore, this.colecaoContatos, id);
    return deleteDoc(contatoRef);
  }
}
