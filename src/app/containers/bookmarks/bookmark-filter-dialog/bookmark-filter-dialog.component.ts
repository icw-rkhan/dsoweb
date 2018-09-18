import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './bookmark-filter-dialog.component.html',
  styleUrls: ['./bookmark-filter-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkFilterDialogComponent implements OnInit {

  categories: Observable<Category[]>;
  contentTypes: any;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categories = this.categoryService.categories;
    this.contentTypes = [];
    this.contentTypes.push({
      id: 0,
      name: 'Videos'
    });
    this.contentTypes.push({
      id: 1,
      name: 'Articles'
    });
    this.contentTypes.push({
      id: 2,
      name: 'Podcast'
    });
    this.contentTypes.push({
      id: 3,
      name: 'Interview'
    });
    this.contentTypes.push({
      id: 4,
      name: 'Tech Guides'
    });
    this.contentTypes.push({
      id: 5,
      name: 'Animations'
    });
    this.contentTypes.push({
      id: 6,
      name: 'Tip Sheets'
    });
  }

}
