import { Directive, ElementRef, Input } from "@angular/core";
import { delay } from "src/app/utils/promise";

@Directive({
    selector: '[MathJax]'
})
export class MathJaxDirective {

    @Input('MathJax') exp!: string;

    mathJaxInstance!: any;
    exitPolling = false;

    constructor(
        private el: ElementRef
    ) { }

    ngOnChanges() {
        if (!this.mathJaxInstance) {
            this.initPolling();
        }
        else {
            this.processExpression();
        }

    }

    async initPolling() {

        if (this.exitPolling) return;

        const MathJax = (window as any).MathJax;

        if (MathJax) {
            this.mathJaxInstance = MathJax;
            this.processExpression();
            return;
        }

        await delay(50);
        this.initPolling();
    };

    processExpression() {
        this.el.nativeElement.innerHTML = this.exp;
        const hub = this.mathJaxInstance.Hub;
        hub.Queue([ "Typeset", hub, this.el.nativeElement ]);
    }

    ngOnDestroy() {
        this.exitPolling = true;
    }
}