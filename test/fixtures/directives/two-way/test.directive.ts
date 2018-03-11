// Angular:
import { Directive, Input, Output } from '@angular/core';

@Directive({
    selector: 'test'
})
export class TestDirective {
    @Input() public input: string;
    @Output() public inputChange = new EventEmitter<string>();
}
