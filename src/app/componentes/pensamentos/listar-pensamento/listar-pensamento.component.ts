import { Router } from '@angular/router';
import { Pensamento } from '../pensamento';
import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos: Pensamento[] = []
  paginaAtual: number = 1
  haMaisPensamentos: boolean = true
  filtro: string = ''
  favoritos: boolean = false
  listaFavoritos: Pensamento[] = []
  titulo: string = 'Meu Mural'

  constructor(
    private service: PensamentoService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos) =>{
      this.listaPensamentos= listaPensamentos
    })
  }

  carregarMaisPensamentos() {
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos)
    .subscribe(listaPensamentos => {
      this.listaPensamentos.push(...listaPensamentos)
      if(!listaPensamentos.length) {
        this.haMaisPensamentos = false
      }
    })
  }

  pesquisarPensamentos(){
    this.haMaisPensamentos=true
    this.paginaAtual=1
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
    .subscribe(listaPensamentos => {
      this.listaPensamentos = listaPensamentos
    })
  }

  listarFavoritos() {
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this.favoritos = true
    this.titulo = 'Meus Favritos'
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
    .subscribe(listaPensamentosFavoritos => {
      this.listaPensamentos = listaPensamentosFavoritos
      this.listaFavoritos = listaPensamentosFavoritos
    })
  }

  recarregarPensamentos() {
    //solucao feita antes da aula
    // this.haMaisPensamentos = true
    // this.paginaAtual = 1
    // this.favoritos = false
    // this.service.listar(this.paginaAtual,this.filtro, this.favoritos)
    // .subscribe(listaPensamentos => {
    //   this.listaPensamentos = listaPensamentos
 //   })
    //solucao apresentada com o router
    this.favoritos = false
    this.paginaAtual = 1
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])

  }

}
