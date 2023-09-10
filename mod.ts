Deno.serve((request) => {
  console.log(request.url)
  const url = new URL(request.url);

  if (url.pathname === "/content") {
    return new Response(
      `
<div
  hx-get="/content"
  hx-swap="outerHTML"
  hx-trigger="load delay:1s"
>
  DATE: ${new Date()}
</div>
    `,
      { headers: { "Content-Type": "text/html" } },
    );
  } else {
    return new Response(
      `
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Morph Bug</title>
  <script src="https://unpkg.com/htmx.org@1.9.5"
    integrity="sha384-xcuj3WpfgjlKF+FXhSQFQ0ZNr39ln+hwjN3npfM9VBnUskLolQAcN80McRIVOPuO" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/idiomorph/dist/idiomorph-ext.min.js"></script>

  <style>
    [hx-get] {
      outline: 2px solid blue;
    }
  </style>
</head>

<body>

  <h2>Expected Output</h2>
  <p>Hear we have a div that is load polling with a delay of 1s.
  <div
    hx-get="/content"
    hx-swap="outerHTML"
    hx-trigger="load delay:1s"
  >
    ORIGINAL CONTENT
  </div>

  <hr />

  <div hx-ext="morph">
    <h2>With Morph the new trigger isn't applied</h2>
    <p>This div is also polling but has hx-swap="morph:outerHTML"</p>
    <p>The load event is not being triggered.</p>
    <div
      hx-get="/content"
      hx-swap="morph:outerHTML"
      hx-trigger="load 1s"
    >
      ORIGINAL CONTENT
    </div>
  </div>

  <hr />

  <div hx-ext="morph">
    <h2>Original trigger is maintained</h2>
    <p>This div is also polling and has hx-swap="morph:outerHTML" and hx-trigger="every 1s"</p>
    <p>After the first swap the hx-trigger attribute becomes "load delay:1s" but the original trigger maintained.</p>
    <div
      hx-get="/content"
      hx-swap="morph:outerHTML"
      hx-trigger="every 1s"
    >
      ORIGINAL CONTENT
    </div>
  </div>

</body>
</html>

  `,
      { headers: { "Content-Type": "text/html" } },
    );
  }
});
