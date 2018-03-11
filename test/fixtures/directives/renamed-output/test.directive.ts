// Angular:
import { Directive, Output } from '@angular/core';

@Directive({
    selector: 'test'
})
export class TestDirective {
    @Output('renamed') public output: string;
}
