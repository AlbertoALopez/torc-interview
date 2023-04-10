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
};

type LaneProps = {
  items: LaneItem[];
};

const Lane = ({ items }: LaneProps) => {
  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <span>
              {item.message}
              <button
                onClick={e => {}}
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

const mockLanes = [
  {
    name: "Bob",
    items: [
      mockItem,
    ]
  },
  {
    name: "George",
    items: [
      mockItem,
    ]
  }
];

type Lane = {
  name: string;
  items: LaneItem[];
}


export default function TorcPage() {
  const [lanes, setLanes] = useState<Lane[]>(mockLanes);

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
