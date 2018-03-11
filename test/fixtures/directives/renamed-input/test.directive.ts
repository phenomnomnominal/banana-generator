// Angular:
import { Directive, Input } from '@angular/core';

@Directive({
    selector: 'test'
})
export class TestDirective {
    @Input('renamed') public input: string;
}
