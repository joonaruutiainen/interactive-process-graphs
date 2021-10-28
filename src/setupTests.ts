// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom';
import { ResizeObserver } from '@juggle/resize-observer';

window.ResizeObserver = ResizeObserver;
window.ResizeObserverEntry = jest.fn();
