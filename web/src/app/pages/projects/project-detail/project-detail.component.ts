import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  template: `<div class="min-h-screen py-20">Project detail coming soon...</div>`,
})
export class ProjectDetailComponent {}
