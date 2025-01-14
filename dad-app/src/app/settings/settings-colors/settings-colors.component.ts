import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ColorPickerModule } from 'ngx-color-picker';
import { ConfigService } from '../config.service';
import { DadThemeService } from '../../theme/dad-theme.service';

@Component({
  selector: 'app-settings-colors',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule, MatInputModule, ColorPickerModule],
  templateUrl: './settings-colors.component.html',
  styleUrl: './settings-colors.component.scss'
})
export class SettingsColorsComponent {
  color: any
  SeedColorSelect(rgba: string){
    this.theme.SetColor(rgba)
  }
  constructor(private theme: DadThemeService){}
}


