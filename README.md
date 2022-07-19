# &lt;bs-hovercard&gt; element

## Installation

```
$ npm install @sonicgarden/bs-hovercard-element
```

## Usage

```js
import '@sonicgarden/bs-hovercard-element'
```

```html
<bs-hovercard>
  <a href="#">SonicGarden</a>
  <template slot="content">
    <div class="hstack align-items-start gap-2">
      <img src="https://avatars.githubusercontent.com/u/762682?s=200&v=4" class="img-thumbnail" style="width: 32px; height: 32px;">
      <div class="vstack gap-2">
        <div class="hstack gap-2">
          <span class="font-weight-bold">SonicGarden.inc</span>
          <a href="https://github.com/SonicGarden" class="text-muted text-decoration-none">@SonicGarden</a>
        </div>
        <div class="text-muted">
          <span>1,960</span>
          <span>Followers</span>
        </div>
      </div>
    </div>
  </template>
</bs-hovercard>
```

## Browser support

Browsers without native [custom element support][support] require a [polyfill][].

- Chrome
- Firefox
- Safari
- Microsoft Edge

[support]: https://caniuse.com/#feat=custom-elementsv1
[polyfill]: https://github.com/webcomponents/custom-elements

## Development

```
pnpm i
pnpm dev
```

## License

Distributed under the MIT license. See LICENSE for details.
