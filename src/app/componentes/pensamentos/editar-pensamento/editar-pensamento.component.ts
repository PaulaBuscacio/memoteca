import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {


  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
        this.formulario = this.formBuilder.group({
        id: [pensamento.id],
        conteudo: [pensamento.conteudo, Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/)
        ])],
        autoria: [pensamento.autoria, Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[a-z0-9áàâãéèêíóôõúç'\s]+$/),
          this.validarConteudoValidator
        ])],
        modelo: [pensamento.modelo],
        favorito: [pensamento.favorito]

      })
    })
  }

  editarPensamento() {
    this.service.editar(this.formulario.value).subscribe(() => {
      this.router.navigate(['/listarPensamento'])
    })

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



