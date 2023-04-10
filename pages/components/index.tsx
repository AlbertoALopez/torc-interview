import React, { useState } from 'react';


type ItemProps = {
  message: string;
};

function removeItem(itemIndex: number, items: LaneItem[]) {
  return items.splice(itemIndex, 0);
}

function addItem(itemIndex: number, items: LaneItem[], item: LaneItem) {
  return items.splice(itemIndex, 0, item);
}

const Item = ({ message }: ItemProps) => {
  const incrementLane = () => {

  };

  return (
    <li>
      <span>
        {message}
        <button
          onClick={incrementLane}
        >
          +
        </button>
      </span>
    </li>
  );
};

type LaneItem = {
  message: string;
  index: number;
  removeItem: Function;
};

const Lane = () => {
  const [items, setItems] = useState<LaneItem[]>([{ message: 'test', removeItem: () => {}, index: 0, }]);

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <span>
              {item.message}
              <button
                onClick={e => removeItemFromLane(index)}
              >
                +
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mockItem = {
  message: 'test',
};

const mockLanes = {
  "Bob": {
    items: [
      mockItem,
    ]
  },
  "George": {
    items: [
      mockItem,
    ]
  }
};

type Lanes = LaneItem[];


export default function TorcPage() {
  const [lanes, setLanes] = useState<Lanes>(mockLanes);

  const removeItemFromLane = (index: number) => {
    const newItems = removeItem(index, items);
    setItems(newItems);
  };

  const addItemToLane = (index: number, item: LaneItem) => {
    if (lane[]) {

    }
    const newItems = addItem(index, items, item);
    setItems(newItems);
  };

  return (
    <div>
      {lanes.map((lane, index)) => (
        <Lane key={index} lane={lane} addItemToLane={addItem} />
      )}
    </div>
  );
}
