import React from 'react';
import { type Layout, Responsive, WidthProvider } from 'react-grid-layout';
import { ImageInfo } from '../../pages/[bookerId]/edit';
import Image from 'next/image';
import 'react-grid-layout/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

type Props = {
  images: ImageInfo[];
};

type LayoutImage = Layout & ImageInfo;

const defaultProps = {
  className: 'layout',
  // rowHeight: 120,
  onLayoutChange: function () {},
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
};

export const ImageGrid = (props: Props) => {
  const onDrop = (layout, layoutItem, _event) => {
    // _event.preventDefault();
    // _event.stopPropagation();
    console.log('onDrop', layout, layoutItem, _event);

    console.log('event', _event);
    console.log('layout', layout);
  };

  const onBreakpointChange = (breakpoint, cols) => {
    console.log('onBreakpointChange', breakpoint, cols);
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
    <div className='h-full min-h-[10rem] w-full bg-slate-200'>
      <ResponsiveGridLayout
        {...defaultProps}
        layouts={{ lg: layout }}
        onDrop={onDrop}
        onBreakpointChange={onBreakpointChange}
        isDroppable={true}
        measureBeforeMount={false}
      >
        {layout?.map((image: ImageInfo) => (
          <div className='relative aspect-square overflow-hidden bg-slate-300' key={image.name}>
            <Image fill className='object-cover' src={image.url} alt={image.name} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};
