// Angular:
import { Component } from '@angular/core';

// Dependencies:
import { OtherComponent } from './other.component';

@Component({
    selector: 'test',
    template: ''
})
export class TestComponent {
    constructor (
        private _otherComponent: OtherComponent
    ) { }
}
