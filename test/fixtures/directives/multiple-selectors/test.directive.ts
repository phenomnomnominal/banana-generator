// Angular:
import { Directive } from '@angular/core';

@Directive({
    selector: 'test, test-test, [testAttribute]'
})
export class TestDirective { }
