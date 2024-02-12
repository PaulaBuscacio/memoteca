import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {


  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: ['',  Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/),

      ])],
      autoria: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-z0-9áàâãéèêíóôõúç'\s]+$/),
        this.validarConteudoValidator
      ])],
      modelo: ['modelo1'],
      favorito: [false]
    })
  }

  criarPensamento() {
    console.log(this.formulario)
    if(this.formulario.valid) {
      this.service.criar(this.formulario.value).subscribe(() =>{
        this.router.navigate(['/listarPensamento'])
      })
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento'])
  }

  habilitarBotao() : string {
    if(this.formulario.valid) {
      return 'botao'
    } else{
      return 'botao__desabilitado'
    }
  }

  validarConteudoValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if(value!= 'oi') {
      return null
    }
    return { 'validadorOi': true}
  }


}
