import React, { memo, useEffect, useState } from "react";

const SCREEN_WIDTH = 720;
const COLUMN_WIDTH = SCREEN_WIDTH / 2 - 80;

function MasonryList(props) {
  const {
    data,
    ListEmptyComponent,
    renderItem,
    numColumns = 2,
    horizontal,
    style,
    columnStyle,
  } = props;
  const [cols, setCols] = useState(
    Array(numColumns)
      .fill(numColumns)
      .map(() => ({ bricks: [], colHeight: 0 }))
  );
  const [generating, setGenerating] = useState(true);

  const textHeight = (text) => {
    const containerWidth = COLUMN_WIDTH; // 20 de cada lado (40), 20 do meio, 10 de cada lado (20)
    const fontSize = 14;
    const lineHeight = fontSize * 1.2;
    const avgCharWidth = fontSize * 0.5;

    const textWidth = text.length * avgCharWidth;
    const nLines = Math.ceil(textWidth / containerWidth);
    const estimatedHeight = nLines * lineHeight;
    return estimatedHeight;
  };

  const getImageSize = async (url) => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve({ height: img.height, width: img.width });
      img.onerror = reject;
      img.src = url;
    });
  };

  const processImage = async () => {
    const processed = await Promise.all(
      data.map(async (item) => {
        if (item.image_url) {
          const { width, height } = await getImageSize(item.image_url);
          return {
            ...item,
            height: (COLUMN_WIDTH * height) / width /*Math.min(500, height)*/,
          };
        }
        return { ...item, height: textHeight(item.message) + 50 };
      })
    );
    return processed;
  };

  const layoutBricks = async () => {
    setGenerating(true);

    const newCols = Array.from({ length: numColumns }, () => ({
      bricks: [],
      colHeight: 0,
    }));

    const processedData = await processImage();

    for (const image of processedData) {
      const shortestIndex = newCols.reduce(
        (minIdx, col, idx, arr) =>
          col.colHeight < arr[minIdx].colHeight ? idx : minIdx,
        0
      );

      newCols[shortestIndex].bricks.push(image);
      newCols[shortestIndex].colHeight += image.height;
    }

    setCols(newCols);
    setGenerating(false);
  };

  useEffect(() => {
    layoutBricks();
  }, [data]);

  return (
    <div>
      {(data.length === 0 || generating) &&
      cols[0].bricks?.length === 0 &&
      ListEmptyComponent ? (
        React.isValidElement(ListEmptyComponent) ? (
          ListEmptyComponent
        ) : (
          // @ts-ignore
          <ListEmptyComponent />
        )
      ) : (
        <div
          style={{
            flex: 1,
            padding: "0 20px",
            display: "flex",
            flexDirection: horizontal ? "column" : "row",
            ...style,
          }}
        >
          {cols.map(({ bricks }, index) => {
            const uniqueBricks = [...new Set(bricks)];
            return (
              <div
                key={`masonry-column-${index}`}
                style={{
                  display: "flex",
                  flex: 1 / numColumns,
                  flexDirection: horizontal ? "row" : "column",
                  ...columnStyle,
                }}
              >
                {uniqueBricks.map((b, num) => {
                  return renderItem({ item: b, i: num });
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default memo(MasonryList);
