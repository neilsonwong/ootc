import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { Department } from 'src/app/models/Department';

import { DEPARTMENT_LOCALIZATIONS } from 'src/app/constants/department-localizations';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(@Inject(LOCALE_ID) public locale: string) { }

  translateDepartments(depts: Department[]): Department[] {
    if (this.locale !== 'en-US') {
        return depts.map(x => this.translateDept(x));
    }
    return depts;
  }

  translateDept(dept: Department): Department {
      dept.name = DEPARTMENT_LOCALIZATIONS.names[dept.name];
      dept.description = DEPARTMENT_LOCALIZATIONS.descriptions[dept.name];
      return dept;
  }
}
