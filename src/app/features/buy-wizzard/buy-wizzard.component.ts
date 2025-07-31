import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  QuotationDestination,
  Quotation,
  QuotationPackage,
  Shipment,
} from '../../core/interfaces/quotation.interface';
import { CommonModule } from '@angular/common';
import { QuotationService } from '../../core/services/quotation.service';

@Component({
  selector: 'app-buy-wizzard',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './buy-wizzard.component.html',
  styleUrls: ['./buy-wizzard.component.css'],
})
export class BuyWizzardComponent {
  cartProducts: any[] = [];
  step = 1;
  loading = false;
  destinationForm: FormGroup;
  quotation: Quotation | null = null;
  quotations: Quotation[] = [];
  shipment: Shipment | null = null;
  selectedQuotationIndex: number | null = null;
  selectedQuotation: Quotation | null = null;
  submitted = false;

  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private quotationService: QuotationService
  ) {
    this.destinationForm = this.fb.group({
      name: ['Patricio Contreras', Validators.required],
      company: [''],
      email: [
        'patricio.contrerasbzld@gmail.com',
        [Validators.required, Validators.email],
      ],
      phone: ['528132805556', Validators.required],
      street: ['Calle Falsa', Validators.required],
      number: ['123', Validators.required],
      district: ['Centro', Validators.required],
      city: ['Monterrey', Validators.required],
      state: ['NL', Validators.required],
      country: ['MX', Validators.required],
      postalCode: ['01000', Validators.required],
      reference: ['Entre calles A y B, cerca del zócalo', Validators.required],
    });

    // Obtener productos del carrito desde localStorage
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      try {
        this.cartProducts = JSON.parse(storedCart);
      } catch (e) {
        this.cartProducts = [];
      }
    }
  }

  async nextStep() {
    let payload: any = {};

    this.submitted = true;
    if (this.step === 1) {
      if (this.destinationForm.invalid) {
        return;
      }
      this.loading = true;
      this.errorMessage = null;

      payload = {
        origin: {
          number: '123',
          postalCode: '01000',
          type: 'origin',
          company: 'WolvenHut MX',
          name: 'WolvenHut MX',
          email: 'whmx@envia.com',
          phone: '528180161135',
          country: 'MX',
          street: 'Calle Falsa',
          district: 'Centro',
          city: 'Ciudad de México',
          state: 'DF',
          phone_code: '52',
          address_id: 1374821,
          category: 1,
        },
        destination: {
          number: this.destinationForm.get('number')?.value,
          postalCode: this.destinationForm.get('postalCode')?.value,
          type: 'destination',
          company: this.destinationForm.get('company')?.value || '',
          name: this.destinationForm.get('name')?.value,
          email: this.destinationForm.get('email')?.value,
          phone: this.destinationForm.get('phone')?.value,
          country: this.destinationForm.get('country')?.value,
          street: this.destinationForm.get('street')?.value,
          district: this.destinationForm.get('district')?.value,
          city: this.destinationForm.get('city')?.value,
          state: this.destinationForm.get('state')?.value,
          phone_code: '52',
          address_id: null,
          category: null,
        },
        packages: this.mapPackagesToQuotation(),
        settings: {
          currency: 'MXN',
        },
        shipment: {
          type: 1,
          import: 0,
          carrier: 'dhl',
        },
      };

      this.quotationService.startQuotation(payload).subscribe({
        next: (response: any) => {
          if (response.meta == 'error') {
            if (response.error.code === 1105) {
              // Unsuported weight unit
              this.errorMessage =
                'Se supera el límite de peso permitido. Por favor, verifica los datos de los paquetes. O solicita una cotización por producto';
            }
          }
          this.quotations = response.data;
          this.selectedQuotationIndex = 0;
          this.loading = false;
          this.submitted = false;
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage =
            'No se pudieron obtener cotizaciones. Intenta de nuevo más tarde.';
          console.error('Error starting quotation:', error);
        },
      });
    }
    if (this.step === 2) {
      // Move to step 3, then show spinner for 2 seconds
      this.step++;
      this.loading = true;

      payload = {
        origin: {
          name: 'oscar mx',
          company: 'oskys factory',
          email: 'osgosf8@gmail.com',
          phone: '8116300800',
          street: 'av vasconcelos',
          number: '1400',
          district: 'mirasierra',
          city: 'Monterrey',
          state: 'NL',
          country: 'MX',
          postalCode: '66236',
          reference: '',
        },
        destination: {
          name: 'oscar',
          company: 'empresa',
          email: 'osgosf8@gmail.com',
          phone: '8116300800',
          street: 'av vasconcelos',
          number: '1400',
          district: 'palo blanco',
          city: 'monterrey',
          state: 'NL',
          country: 'MX',
          postalCode: '66240',
          reference: '',
        },
        packages: [
          {
            content: 'camisetas rojas',
            amount: 1,
            type: 'box',
            dimensions: {
              length: 2,
              width: 5,
              height: 5,
            },
            weight: 63,
            insurance: 0,
            declaredValue: 400,
            weightUnit: 'KG',
            lengthUnit: 'CM',
          },
        ],
        shipment: {
          carrier: 'ups',
          service: 'saver',
          type: 1,
        },
        settings: {
          printFormat: 'PDF',
          printSize: 'STOCK_4X6',
          comments: 'comentarios de el envío',
        },
      };

      this.quotationService.generateShipment(payload).subscribe({
        next: (response: any) => {
          this.loading = false;
          this.shipment = response.data[0];
          this.submitted = false;
        },
        error: (error) => {
          this.loading = false;
          this.submitted = false;
          console.error('Error generating shipment:', error);
        },
      });
    }
    if (this.step < 3) {
      this.step++;
      this.submitted = false;
    }
  }

  mapPackagesToQuotation(): QuotationPackage[] {
    // Map cartProducts to the QuotationPackage structure
    return this.cartProducts.map((prod: any) => ({
      type: prod.type || 'envelope',
      content: prod.content || prod.name || 'Accesorios',
      amount: prod.quantity || 1,
      name: prod.name || 'Paquete',
      declaredValue: prod.declaredValue || 0,
      lengthUnit: prod.lengthUnit || 'CM',
      weightUnit: prod.weightUnit || 'KG',
      weight: prod.weight || 0.5,
      insurance: prod.insurance || 0,
      dimensions: {
        length: prod.length || 20,
        width: prod.width || 2,
        height: prod.height || 15,
      },
    }));
  }

  prevStep() {
    if (this.step > 1) {
      this.step--;
      this.submitted = false;
    }
  }

  get f() {
    return this.destinationForm.controls;
  }
  get coord() {
    return (this.destinationForm.get('coordinates') as FormGroup).controls;
  }
}
