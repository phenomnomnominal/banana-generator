// Angular:
import { Component } from '@angular/core';

// Dependencies:
import { TestDirective } from './test.directive';

@Component({
    selector: 'test',
    template: ''
})
export class TestComponent {
    constructor (
        private _testDirective: TestDirective
    ) { }
}
