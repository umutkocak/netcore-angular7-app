import { CityService } from './../../services/city.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { City } from '../../models/city';
@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.css'],
  providers: [CityService]
})
export class CityAddComponent implements OnInit {
  city: City;
  cityAddForm: FormGroup;
  constructor(
    private cityService: CityService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  createCityForm() {
    this.cityAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.createCityForm();
  }

  add() {
    if (this.cityAddForm.valid) {
      this.city = Object.assign({}, this.cityAddForm.value);
      // Todo
      this.city.name = this.authService.getCurrentUserId();
      this.cityService.add(this.city);
    }
  }
}
