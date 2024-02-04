import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarPensamentoComponent } from './componentes/pensamentos/criar-pensamento/criar-pensamento.component';
import { ListarPensamentoComponent } from './componentes/pensamentos/listar-pensamento/listar-pensamento.component';

const routes: Routes = [
  {
    path: 'criarPensamento',
    component: CriarPensamentoComponent,
    pathMatch: 'full'
  },
  {
    path: 'listarPensamento',
    component: ListarPensamentoComponent,
    pathMatch: 'full'

  },
  {
    path: '',
    redirectTo: 'listarPensamento',
    pathMatch: 'full'

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
