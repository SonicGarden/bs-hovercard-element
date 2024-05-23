import Popover from 'bootstrap/js/dist/popover';
declare const Placements: readonly ["auto", "top", "bottom", "left", "right"];
type Placement = (typeof Placements)[number];
export declare class BsHovercardElement extends HTMLElement {
    connectedCallback(): void;
    disconnectedCallback(): void;
    show(): void;
    hide(): void;
    private init;
    private addListeners;
    private removeListeners;
    private addTipListeners;
    private removeTipListeners;
    private enter;
    private leave;
    private injectStyle;
    get bsPopover(): Popover | undefined;
    get tip(): HTMLElement | undefined;
    get hovered(): boolean;
    set hovered(value: boolean);
    private clearTimer;
    get timer(): number | undefined;
    set timer(value: number | undefined);
    get placement(): Placement;
    set placement(value: Placement);
}
declare global {
    interface Window {
        BsHovercardElement: typeof BsHovercardElement;
    }
}
export {};
