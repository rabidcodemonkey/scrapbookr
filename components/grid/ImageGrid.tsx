import React from 'react';
import { DropEvent } from 'react-dropzone';
import { type Layout, Responsive, WidthProvider } from 'react-grid-layout';
import { ImageInfo } from '../../pages/[bookerId]/edit';
import Image from 'next/image';

const ResponsiveGridLayout = WidthProvider(Responsive);

type Props = {
  images: ImageInfo[];
};

type LayoutImage = Layout & ImageInfo;

const defaultProps = {
  className: 'layout',
  rowHeight: 30,
  onLayoutChange: function () {},
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
};

export const ImageGrid = (props: Props) => {
  const onDrop = (layout, layoutItem, _event: DropEvent) => {
    // _event.preventDefault();
    // _event.stopPropagation();
    console.log('onDrop', layout, layoutItem, _event);

    console.log('event', _event);
    console.log('layout', layout);
  };

  const layout: LayoutImage[] = props.images.map((image, index) => {
    return {
      ...image,
      i: image.name,
      x: 0,
      y: 0,

      w: 2,
      h: 2,
    };
  });

  return (
    <div className='h-full min-h-[10rem] w-full bg-red-200'>
      <ResponsiveGridLayout
        {...defaultProps}
        layouts={{ lg: layout }}
        compactType={'horizontal'}
        onDrop={onDrop}
        isDroppable={true}
        measureBeforeMount={false}
      >
        {layout?.map((image: ImageInfo) => (
          // <div key={image.name}>{image.name}</div>
          <div
            draggable={true}
            unselectable='on'
            key={`image-${image.name}`}
            onDragStart={(e) => e.dataTransfer.setData('text/plain', '')}
          >
            <Image width={200} height={200} src={image.url} alt={image.name} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};
