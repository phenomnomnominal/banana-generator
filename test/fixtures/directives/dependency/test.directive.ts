// Angular:
import { Directive } from '@angular/core';

// Dependencies:
import { OtherDirective } from './other.directive';

@Directive({
    selector: 'test'
})
export class TestDirective {
    constructor (
        private _otherDirective: OtherDirective
    ) { }
}
