declare module 'react-image-magnifiers' {
  import { ComponentType } from 'react';

  interface MagnifierProps {
    imageSrc: string;
    imageAlt?: string;
    mouseActivation?: 'hover' | 'click';
    dragToMove?: boolean;
    style?: React.CSSProperties;
    magnifierSize?: string | number;
    magnifierBorderSize?: number;
    magnifierBorderColor?: string;
  }

  export const Magnifier: ComponentType<MagnifierProps>;
} 