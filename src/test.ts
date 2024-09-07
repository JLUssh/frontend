interface Foo {
  kind: "foo";
  diffType: string;
  fooOnly: boolean;
  shared: number;
}

interface Bar {
  kind: "bar";
  diffType: number;
  barOnly: boolean;
  shared: number;
}
function handle2(input: Foo | Bar) {
  // 报错，并没有起到区分的作用，在两个代码块中都是 Foo | Bar
  if (typeof input.diffType === "string") {
    input.fooOnly;
  } else {
    input.barOnly;
  }
}
