import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  Freshness = ["Brand New", "Second Hand", "Refurbished"]

  productForm!: FormGroup

  actionBtn: string = 'Save'

  constructor(private fb: FormBuilder, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>) {
    this.productForm = fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    })

    if (this.editData) {
      this.actionBtn = 'Update'
      this.productForm.controls['productName'].setValue(this.editData.productName)
      this.productForm.controls['category'].setValue(this.editData.category)
      this.productForm.controls['freshness'].setValue(this.editData.freshness)
      this.productForm.controls['date'].setValue(this.editData.date)
      this.productForm.controls['price'].setValue(this.editData.price)
      this.productForm.controls['comment'].setValue(this.editData.comment)
    }
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProducts(this.productForm.value).subscribe(res => {
          alert("Product Added Successfully")
          this.productForm.reset()
          this.dialogRef.close("Save")
        }, err => {
          alert("error while adding product")
        })
      }
    } else {
      this.updateProduct()
    }
  }

  updateProduct() {
    this.api.putProducts(this.productForm.value, this.editData.id).subscribe(res => {
      alert("Product Updated Successfully ✔")
      this.productForm.reset()
      this.dialogRef.close("Update")
    },err=>{
      alert("error while update product ❌")
    })
  }
}
