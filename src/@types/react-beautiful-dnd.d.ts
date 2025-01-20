declare module 'react-beautiful-dnd' {
  import { ComponentType } from 'react';

  export const DragDropContext: ComponentType<any>;
  export const Droppable: ComponentType<any>;
  export const Draggable: ComponentType<any>;

  export type DraggableProvided = {
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: any;
    dragHandleProps: any;
    placeholder: string;
    droppableProps: any;
  };

  export type DropResult = {
    draggableId: string;
    type: string;
    source: {
      droppableId: string;
      index: number;
    };
    destination?: {
      droppableId: string;
      index: number;
    };
  };
}
