/**
 * Basic test file for TodoListApp
 * Verifies the component can be imported and basic functionality
 */

import React from 'react';
import App from '../App';

describe('TodoListApp', () => {
  it('should import App component without errors', () => {
    expect(App).toBeDefined();
    expect(typeof App).toBe('function');
  });

  it('should be a valid React component', () => {
    expect(React.isValidElement(<App />)).toBe(true);
  });
});