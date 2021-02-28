import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './counterSlice';

export default function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center mb-3">
        <button
          className="btn btn-outline-primary btn-lg"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
          type="button"
        >
          +
        </button>
        <span className="px-3 mt-1 text fs-1">{count}</span>
        <button
          className="btn btn-outline-primary btn-lg"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
          type="button"
        >
          -
        </button>
      </div>
      <div className="d-flex align-items-center justify-content-center mb-3">
        <input
          className="form-control p-1 text-center me-2"
          style={{ width: 64 }}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className="btn btn-light me-2"
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
          type="button"
        >
          Add Amount
        </button>
        <button
          className="btn btn-light"
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
          type="button"
        >
          Add Async
        </button>
      </div>
    </div>
  );
}
