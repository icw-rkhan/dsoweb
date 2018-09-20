import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Education } from '../../../models/education.model';

@Component({
  selector: 'dso-education-search',
  templateUrl: './education-search.component.html',
  styleUrls: ['./education-search.component.scss']
})
export class EducationSearchComponent implements OnInit {
  @Input('listSchool') listSchool: any[];
  @Output() selectedEducation: EventEmitter<Education> = new EventEmitter(null);
  @Output() backSearchEducation: EventEmitter<null> = new EventEmitter(null);
  listSchoolS: any[];

  constructor() {
  }

  ngOnInit() {
    this.listSchoolS = this.listSchool;
  }

  selected(s: any) {
    const e = new Education().deserialize(s);
    this.selectedEducation.emit(s);
  }

  search(e) {
    this.listSchoolS = this.listSchool.filter((es: Education) => es.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
  }

  _backSearchEducation() {
    this.backSearchEducation.emit();
  }

}