import React, { useState, useCallback } from 'react';

import styles from './index.module.css';

function removeItem(itemIndex: number, items: LaneItem[]) {
  const newItems = items;
  newItems.splice(itemIndex, 1);
  return newItems;
}

function addItem(itemIndex: number, items: LaneItem[], item: LaneItem) {
  const newItems = items;
  newItems.splice(itemIndex, 0, item);
  return newItems;
}

type LaneItem = {
  message: string;
};

enum POSITION {
  DECREMENT,
  INCREMENT
};

const Lane = ({ items, moveItemToLane, name, canDecrementItem, canIncrementItem }: LaneProps) => {
  return (
    <div className={styles.lane}>
      <h1>{name}</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <button
              disabled={!canDecrementItem}
              onClick={() => moveItemToLane(item, index, POSITION.DECREMENT)}
            >
              -
            </button>
            <span>
              {item.message}
              <button
                disabled={!canIncrementItem}
                onClick={() => moveItemToLane(item, index, POSITION.INCREMENT)}
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
      { message: "test1" },
      { message: "test2" },
    ]
  },
  {
    name: "George",
    items: [
      mockItem,
      { message: "test3" },
      { message: "test4" },
    ]
  },
];

type Lane = {
  name: string;
  items: LaneItem[];
}

type LaneProps = {
  name: string;
  items: LaneItem[];
  moveItemToLane: Function;
  canIncrementItem: boolean;
  canDecrementItem: boolean;
};

export default function TorcPage() {
  const [lanes, setLanes] = useState<Lane[]>(mockLanes);

  const removeItemFromLane = (itemIndex: number, lane: Lane) => {
    const newItems = removeItem(itemIndex, lane.items);
    return { ...lane, items: newItems };
  };

  const addItemToLane = (itemIndex: number, laneIndex: number, item: LaneItem) => {
    const newItems = addItem(itemIndex, lanes[laneIndex].items, item);
    return { ...lanes[laneIndex], items: newItems };
  };

  const moveItemToLane = (
    itemIndex: number,
    newLaneIndex: number,
    originalLaneIndex: number,
    item: LaneItem
  ) => {
    const newLane = addItemToLane(itemIndex, newLaneIndex, item);
    const oldLane = removeItemFromLane(itemIndex, lanes[originalLaneIndex]);

    setLanes((lanes) => {
      const newLanes = lanes.map((lane, index) => {
        if (index === originalLaneIndex) {
          return oldLane;
        } else if (index === newLaneIndex) {
          return newLane;
        }

        return lane;
      });

      return newLanes;
    });
  };

  const canIncrementItem = useCallback((index: number) => {
    return lanes[index + 1] !== undefined;
  }, [lanes]);

  const canDecrementItem = useCallback((index: number) => {
    return lanes[index - 1] !== undefined;
  }, [lanes]);

  return (
    <div className={styles.grid}>
      {lanes.map((lane, index) => {
        return (
          <React.Fragment key={index}>
            <Lane
              name={lane.name}
              items={lane.items}
              key={index}
              moveItemToLane={(item: LaneItem, itemIndex: number, position: POSITION) => {
                if (position === POSITION.INCREMENT) {
                  moveItemToLane(itemIndex, index + 1, index, item);
                } else {
                  moveItemToLane(itemIndex, index - 1, index, item);
                }
              }}
              canIncrementItem={canIncrementItem(index)}
              canDecrementItem={canDecrementItem(index)}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}
