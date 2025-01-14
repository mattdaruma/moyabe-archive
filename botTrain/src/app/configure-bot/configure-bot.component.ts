import { BotManagerService } from './../bot-manager.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-configure-bot',
  templateUrl: './configure-bot.component.html',
  styleUrls: ['./configure-bot.component.sass'],
})
export class ConfigureBotComponent implements OnInit {
  @ViewChild(MatAutocompleteTrigger, { static: false })
  trigger: MatAutocompleteTrigger;
  constructor(private fb: FormBuilder, private botManager: BotManagerService) {}

  public Trainers = this.botManager.trainers;
  private saveTimeout;
  botForm = this.fb.group({
    name: [''],
    desc: [''],
    output: [''],
  });
  trainerForm = this.fb.group({
    addColumn: [''],
    addWeight: ['']
  });
  saveTriggered = false;

  columns: string[] = [];
  filteredColumns: Observable<string[]>;
  filteredTrainColumns: Observable<string[]>;

  addTrainer(): void {
    const newTrainColumn = this.trainerForm.get('addColumn').value;
    for(const ind in this.botManager.trainers){
      if(this.botManager.trainers[ind].column === newTrainColumn){
        return alert(`This column already exists as a trainer: \r\n${newTrainColumn}`);
      }
    }
    this.botManager.trainers.push({
      column: newTrainColumn,
      weight: this.trainerForm.get('addWeight').value
    });
    this.botManager.botChanged.next(true);
  }

  ngOnInit(): void {
    this.trainerForm.get('addWeight').setValue(1);
    this.columns = this.botManager.headers;
    const outputControl = this.botForm.get('output') as FormControl;
    this.filteredColumns = outputControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    const addTrainerControl = this.trainerForm.get('addColumn') as FormControl;
    this.filteredTrainColumns = addTrainerControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    const nameControl = this.botForm.get('name') as FormControl;
    nameControl.setValue(this.botManager.bot.name);
    nameControl.valueChanges.subscribe((newName) => {
      this.triggerSave();
    });
    const descControl = this.botForm.get('desc') as FormControl;
    descControl.setValue(this.botManager.bot.desc);
    descControl.valueChanges.subscribe((newDesc) => {
      this.triggerSave();
    })
    const predictorControl = this.botForm.get('output') as FormControl;
    predictorControl.setValue(this.botManager.bot.predictor);
    predictorControl.valueChanges.subscribe((newPred) => {
      this.triggerSave();
    })
    this.botManager.botChanged.subscribe(botChanged => {
      if (botChanged){
        nameControl.setValue(this.botManager.bot.name, {emitEvent: false});
        descControl.setValue(this.botManager.bot.desc, {emitEvent: false});
        predictorControl.setValue(this.botManager.bot.predictor, {emitEvent: false});
      }
    });
  }
  public populateOutcome(): void {
    if (this.trigger.activeOption) {
      this.trigger.writeValue(this.trigger.activeOption.value);
    }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.columns.filter((column) =>
      column.toLowerCase().includes(filterValue)
    );
  }
  triggerSave(): void{
    this.saveTriggered = true;
    clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => { this.saveBot(); }, 3000);
  }
  saveBot(): void {
    this.saveTriggered = false;
    clearTimeout(this.saveTimeout);
    this.botManager.uploadBot({
      name: this.botForm.get('name').value,
      desc: this.botForm.get('desc').value,
      predictor: this.botForm.get('output').value
    });
  }
}
