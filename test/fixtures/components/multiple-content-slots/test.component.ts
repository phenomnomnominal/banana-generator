// Angular:
import { Component } from '@angular/core';

@Component({
    selector: 'test',
    template: `
        <ng-content>
        </ng-content>
        <ng-content
            select="content">
        </ng-content>
    `
})
export class TestComponent { }
