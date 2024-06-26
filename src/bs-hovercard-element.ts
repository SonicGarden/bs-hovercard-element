import Popover from 'bootstrap/js/dist/popover'

type State = {
  popover: Popover
  hovered: boolean
  timer?: number | undefined
}

const Placements = ['auto', 'top', 'bottom', 'left', 'right'] as const

type Placement = (typeof Placements)[number]

const CUSTOM_CLASS_NAME = 'bs-hovercard'
const GLOBAL_STYLE_ID = 'bs-hovercard-style'

const states = new WeakMap<BsHovercardElement, State>()

export class BsHovercardElement extends HTMLElement {
  connectedCallback(): void {
    window.setTimeout(() => this.init(), 0)
  }

  disconnectedCallback(): void {
    this.removeListeners()
    this.bsPopover?.dispose()
    states.delete(this)
  }

  show(): void {
    this.clearTimer()

    // NOTE: Calling popover.show() when it has already been shown will break the position.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((this.bsPopover as any)._isShown()) return

    this.timer = window.setTimeout(() => {
      this.bsPopover?.show()
      this.clearTimer()
    }, 500)
  }

  hide(): void {
    this.clearTimer()

    this.timer = window.setTimeout(() => {
      if (this.hovered) return

      this.bsPopover?.hide()
      this.clearTimer()
    }, 200)
  }

  private init() {
    const template = this.querySelector('[slot="content"]')
    if (!template) {
      throw new Error('template is not found')
    }

    const popover = new Popover(this, {
      container: 'body',
      // eslint-disable-next-line github/no-inner-html
      content: template.innerHTML,
      html: true,
      sanitize: false,
      trigger: 'manual',
      customClass: CUSTOM_CLASS_NAME,
      placement: this.placement,
    })
    states.set(this, {popover, hovered: false})

    this.addListeners()
    this.injectStyle()
  }

  private addListeners(): void {
    this.addEventListener('mouseenter', this.enter)
    this.addEventListener('mouseleave', this.leave)
    this.addEventListener('shown.bs.popover', this.addTipListeners)
    this.addEventListener('hide.bs.popover', this.removeTipListeners)
  }

  private removeListeners(): void {
    this.removeEventListener('mouseenter', this.enter)
    this.removeEventListener('mouseleave', this.leave)
    this.removeEventListener('shown.bs.popover', this.addTipListeners)
    this.removeEventListener('hide.bs.popover', this.removeTipListeners)
  }

  private addTipListeners = () => {
    this.tip?.addEventListener('mouseenter', this.enter)
    this.tip?.addEventListener('mouseleave', this.leave)
  }

  private removeTipListeners = () => {
    this.tip?.removeEventListener('mouseenter', this.enter)
    this.tip?.removeEventListener('mouseleave', this.leave)
  }

  private enter = (): void => {
    this.hovered = true
    this.show()
  }

  private leave = (): void => {
    this.hovered = false
    this.hide()
  }

  private injectStyle(): void {
    if (document.getElementById(GLOBAL_STYLE_ID)) return

    const style = document.createElement('style')
    style.setAttribute('id', GLOBAL_STYLE_ID)
    style.textContent = `
      .${CUSTOM_CLASS_NAME} {
        max-width: none !important;
      }
    `
    this.append(style)
  }

  get bsPopover(): Popover | undefined {
    return states.get(this)?.popover
  }

  get tip(): HTMLElement | undefined {
    // NOTE: tip is private property
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.bsPopover as any)?.tip as HTMLElement | undefined
  }

  get hovered(): boolean {
    return !!states.get(this)?.hovered
  }

  set hovered(value) {
    const state = states.get(this)
    if (!state) {
      throw new Error('state is not initialized')
    }

    state.hovered = value
    states.set(this, state)
  }

  private clearTimer(): void {
    clearTimeout(this.timer)
    this.timer = undefined
  }

  get timer(): number | undefined {
    return states.get(this)?.timer
  }

  set timer(value) {
    const state = states.get(this)
    if (!state) {
      throw new Error('state is not initialized')
    }

    state.timer = value
    states.set(this, state)
  }

  get placement(): Placement {
    const placement = this.getAttribute('placement')
    return placement && (Placements as readonly string[]).includes(placement) ? (placement as Placement) : 'auto'
  }

  set placement(value) {
    this.setAttribute('placement', value)
  }
}

declare global {
  interface Window {
    BsHovercardElement: typeof BsHovercardElement
  }
}

if (!window.customElements.get('bs-hovercard')) {
  window.BsHovercardElement = BsHovercardElement
  window.customElements.define('bs-hovercard', BsHovercardElement)
}
