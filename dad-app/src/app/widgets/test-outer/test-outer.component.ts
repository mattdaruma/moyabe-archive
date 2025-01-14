import { Component } from '@angular/core';
import { TestInnerComponent } from '../test-inner/test-inner.component';

@Component({
  selector: 'app-test-outer',
  standalone: true,
  imports: [TestInnerComponent],
  templateUrl: './test-outer.component.html',
  styleUrl: './test-outer.component.scss'
})
export class TestOuterComponent {

}
