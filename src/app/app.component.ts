import { Component, Input, OnInit } from '@angular/core';
import { HelloComponent } from './hello.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppService, ViaCepResponse } from './app.service';
import { map, Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskService } from 'ngx-mask';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HelloComponent,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  viaCepObservable$!: Observable<ViaCepResponse>;
  title = 'BDMG Teste Frontend';
  panelOpenState: boolean = true;
  viaCepData!: ViaCepResponse;
  viaCepForm!: FormGroup;
  @Input() name!: string;

  constructor(
    private formBuilder: FormBuilder,
    private ngxMaskService: NgxMaskService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.buildForm(new ViaCepResponse());

    this.viaCepObservable$ = this.appService.get().pipe(map(data => {
      this.viaCepForm.patchValue(data);
      return data
    }))
  }

  private buildForm({ cep, logradouro, complemento, bairro, localidade, uf, gia, ddd, siafi, ibge }: ViaCepResponse): void {
    this.viaCepForm = this.formBuilder.group({
      cep: [this.ngxMaskService.applyMask(cep, '00000-000'), Validators.required],
      logradouro: [logradouro, Validators.required],
      complemento: [this.ngxMaskService.applyMask(complemento, '0.000'), Validators.required],
      bairro: [bairro, Validators.required],
      localidade: [localidade, Validators.required],
      uf: [uf, Validators.required],
      gia: [gia, Validators.required],
      ddd: [ddd, Validators.required],
      siafi: [{ value: siafi, disabled: true }, Validators.required],
      ibge: [{ value: ibge, disabled: true }, Validators.required],
    });
  }

  public onSubmit(): void {
    if (this.viaCepForm.valid) {
      return;
    }
  }

}
