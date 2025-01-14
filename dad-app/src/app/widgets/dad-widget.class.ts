import { Observable, forkJoin, first, map, shareReplay, Subject, of } from "rxjs"
import { IDadWidget } from "./dad-widget.interface"
import { FormControl, FormGroup } from "@angular/forms"

export class DadWidget {
    Id: string = this.Data?.Id ?? crypto.randomUUID()
    Type: string = this.Data?.Type ?? 'widget'
    Children = this.Data?.Children?.map(c => new DadWidget(c, this, (this.Root ?? this as DadWidget))) ?? [] as DadWidget[]
    Dictionary: { [prop: string]: DadWidget } = !this.Parent ? this.buildDictionary() : this.Root?.Dictionary!
    Form?: FormGroup | undefined = this.Data.Form ? new FormGroup({}) : undefined
    Field?: FormControl = this.Data?.Key ? new FormControl(this.Data.Value) : undefined
    Filter?: DadWidget = this.Data?.FilterId ? this.Dictionary[this.Data.FilterId] : undefined
    Paginator?: DadWidget = this.Data?.PaginatorId ? this.Dictionary[this.Data.PaginatorId] : undefined
    PageChange = this.Paginator ? new Subject<{ index: number, size: number, count: number }>() : undefined
    ChildrenReady: Observable<boolean> = this.Children.length > 0
        ? forkJoin(this.Children.map(c => c.Ready.pipe(first())))
            .pipe(
                map(() => true),
                shareReplay(1)
            )
        : of(true)
    private ready = new Subject<boolean>()
    MarkReady = () => this.ready.next(true)
    Ready = forkJoin([
        this.ready.pipe(first()),
        this.ChildrenReady.pipe(first())
    ]).pipe(map(() => true), shareReplay(1))
    private buildDictionary(dictionary: { [prop: string]: DadWidget } = {}, widget: DadWidget = this) {
        dictionary[widget.Id] = widget
        for (let child of widget.Children) {
            dictionary = this.buildDictionary(dictionary, child)
        }
        return dictionary
    }
    constructor(public Data: IDadWidget, public Parent?: DadWidget, public Root?: DadWidget) {}
}