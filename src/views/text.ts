import { Config } from "./../config";
import { View0D } from "../api";
import { parse, Spec, View } from "vega-lib";

export function createTextView(el: Element, view: View0D, _config: Config) {
  const vgSpec: Spec = {
    padding: 10,
    height: 20,

    signals: [
      { name: "pending", value: false },
      { name: "approximate", value: false }
    ],

    data: [
      {
        name: "base",
        values: [{ value: 1 }]
      },
      {
        name: "table",
        values: [{ value: 0 }]
      }
    ],

    marks: [
      {
        type: "text",
        from: { data: "table" },
        encode: {
          enter: {
            x: { value: 0 },
            y: { value: 0 },
            fontSize: { value: 16 },
            fontWeight: { value: "bold" },
            fill: { value: "#000" }
          },
          update: {
            text: {
              signal: `pending ? 'Loading View...' : '${
                view.title
              }: ' + approximate ? ' ~ ' : '' + format(datum.value, ',d') + ' / ' + format(data('base')[0].value, ',d') + ' (' + format(datum.value / data('base')[0].value, '.0%') + ')'`
            }
          }
        }
      }
    ]
  };

  const runtime = parse(vgSpec);

  const vgView = new View(runtime)
    .initialize(el)
    .renderer("svg")
    .run();

  vgView["_spec"] = vgSpec;
  return vgView;
}
