// Angular:
import { Directive, Optional } from '@angular/core';

// Dependencies:
import { OtherDirective } from './other.directive';

@Directive({
    selector: 'test'
})
export class TestDirective {
    constructor (
        @Optional() private _otherDirective: OtherDirective
    ) { }
}
