### Bug Report: `hx-swap` "morph:outerHTML" Doesn't Recognize New `hx-trigger` Attributes

#### Description:
When using the `idiomorph-ext` extension with `htmx`, setting `hx-swap` to "morph:outerHTML" doesn't properly recognize and apply new `hx-trigger` attributes from the fetched content.


#### Reproduction:

```html
<!-- /content -->
<div
  hx-get="/content"
  hx-swap="outerHTML"
  hx-trigger="load delay:1s"
>
  DATE: ${new Date()}
</div>
```

2. HTML Markup (showcasing the issue):
```html
<div hx-ext="morph">
  <div
    hx-get="/content"
    hx-swap="morph:outerHTML"
    hx-trigger="load 1s"
  >
    ORIGINAL CONTENT
  </div>
</div>
```


#### Expected Behavior:
On swapping, the newly fetched content's `hx-trigger` attribute should be respected and its behavior should be applied.
Causing this component to load poll.

#### Actual Behavior:
The hx-trigger is not applied to the newly fetched content so the content does not poll.

#### Additional Information:
If the original element has a hx-trigger of "every 1s", then that trigger will still be active post-swap.