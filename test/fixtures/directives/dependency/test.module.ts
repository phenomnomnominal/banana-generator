// Angular:
import { NgModule } from '@angular/core';

// Dependencies:
import { OtherDirective } from './other.directive';
import { TestDirective } from './test.directive';

@NgModule({
    declarations: [
        OtherDirective,
        TestDirective
    ]
})
export class TestModule { }
