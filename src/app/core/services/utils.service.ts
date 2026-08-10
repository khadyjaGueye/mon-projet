import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data, Model } from '../interface/model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  parseResponse<T>(responseOrError: T | HttpErrorResponse): { type: 'success' | 'error', message: string } {
    if (responseOrError instanceof HttpErrorResponse) {
      const message = responseOrError.error?.data?.message || 'Erreur inconnue';
      return { type: 'error', message };
    } else {
      const response = responseOrError as Model<Data>;
      const message = response.data?.message || 'Opération réussie';
      return { type: 'success', message };
    }
  }

  show(type: 'success' | 'error', message: string) {
    Swal.fire({
      icon: type,
      title: type === 'error' ? 'Oops...' : message,
      text: type === 'error' ? message : '',
      position: type === 'success' ? 'top-end' : undefined,
      showConfirmButton: false,
      timer: 1500
    });
  }

  confirm(title: string,text: string ): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      reverseButtons: true
    }).then((result) => {
      return result.isConfirmed;
    });

  }
}
