// Angular:
import { Directive, Output } from '@angular/core';

@Directive({
    selector: 'test'
})
export class TestDirective {
    @Output() public output: boolean;
}
