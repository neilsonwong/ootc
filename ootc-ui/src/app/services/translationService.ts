import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { Department } from 'src/app/models/Department';

import { DEPARTMENT_LOCALIZATIONS } from 'src/app/constants/department-localizations';
import { ROLE_LOCALIZATIONS } from 'src/app/constants/role-localizations';

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
    const originalName = dept.name;
    dept.name = DEPARTMENT_LOCALIZATIONS.names[originalName] || dept.name;
    dept.description = DEPARTMENT_LOCALIZATIONS.descriptions[originalName] || dept.description;
    return dept;
  }

  translateRole(role: string): string {
    return ROLE_LOCALIZATIONS[role] || role;
  }
}
