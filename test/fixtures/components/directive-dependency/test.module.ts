// Angular:
import { NgModule } from '@angular/core';

// Dependencies:
import { TestComponent } from './test.component';
import { TestDirective } from './test.directive';

@NgModule({
    declarations: [
        TestComponent,
        TestDirective
    ]
})
export class TestModule { }
