import React from 'react';

export function WithClasses<T>(
  Component: React.ComponentType<T>
) {
  return function Wrapper(props: T) {
    return (
      <div>
        <Component {...props} />
      </div>
    );
  };
}
