import { shuffle } from "@/utils";
import { XMLParser } from "fast-xml-parser";
import { DynamicMap } from "./mapwrap";

function ensureArray<T>(maybeArray: T | T[]): T[] | undefined {
  if (maybeArray === undefined) return undefined;
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}

export default async function Home() {
  const res = await fetch(
    "https://cap-alerts.s3.amazonaws.com/unfiltered/rss.xml",
    { cache: "force-cache" }
  );
  const data = await res.text();
  const jsonData = new XMLParser().parse(data);
  const items = jsonData?.rss?.channel?.item;
  if (!items || !Array.isArray(items)) return <div>No alerts found.</div>;

  const polygons: [number, number][][] = (
    await Promise.all(
      shuffle(items).map(async (item) => {
        const itemRes = await fetch(item.link, { cache: "force-cache" });
        const itemData = await itemRes.text();
        const itemJsonData = new XMLParser().parse(itemData);
        const itemPolygons = ensureArray(itemJsonData.alert?.info)
          ?.map(({ area }) =>
            ensureArray(area)?.map(({ polygon }) =>
              ensureArray(polygon)?.map((polygonStr: string) =>
                polygonStr
                  ?.split(" ")
                  .map(
                    (latLngStr) =>
                      latLngStr.split(",").map(Number) as [number, number]
                  )
              )
            )
          )
          .flat()
          .filter(Boolean)
          .flat()
          .filter(Boolean);

        if (itemPolygons && itemPolygons.length > 0) {
          return itemPolygons;
        }

        return [];
      })
    )
  ).flat();

  return (
    <div>
      <DynamicMap polygons={polygons} />
    </div>
  );
}
