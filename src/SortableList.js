import React from 'react'
import { useDrag, useDrop } from 'react-dnd';

const ItemType = 'SORTABLE_ITEM';

const SortableList = ({items, setItems}) => {
    const moveItem = (dragIndex, hoverIndex) => {
        const draggedItem = items[dragIndex];
        const newItems = [...items];
        newItems.splice(dragIndex, 1);
        newItems.splice(hoverIndex, 0, draggedItem);
        setItems(newItems);
    };

  return (
    <ul className='sortable-list'>
        {items.map((item, index) => (
            <SortableListItem key={item} index={index} item={item} moveItem={moveItem} />
        ))}
    </ul>
  )
}

const SortableListItem = ({item, index, moveItem}) => {
    const ref = React.useRef(null);
    const [, drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem) => {
            if(draggedItem.index !== index) {
                moveItem(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <li ref={ref}
        style={{
            opacity: isDragging ? 0.5 : 1,
            cursor: 'move',
            padding: '8px',
            margin: '4px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
        }}>
            {item}
        </li>
    );
}

export default SortableList;