import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import exampleProcesses from './exampleProcesses';

jest.mock('./components/ProcessGraph', () => ({
  __esModule: true,
  default: () => <div />,
}));

describe('App component', () => {
  it('renders without crashing', () => {
    render(<App />);
  });
  it('renders the dropdown select component', () => {
    render(<App />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
  it('sets correct default value for dropdown component', () => {
    render(<App />);
    const defaultValue = exampleProcesses[0].name;
    const dropdownSelect = screen.getByRole('combobox') as HTMLInputElement;
    expect(dropdownSelect.value).toEqual(defaultValue);
  });
  it('updates the dropdown select value when selecting a process from the options', () => {
    render(<App />);
    const example = exampleProcesses[1].name;
    fireEvent.change(screen.getByRole('combobox'), { target: { value: example } });
    const dropdownSelect = screen.getByRole('combobox') as HTMLInputElement;
    expect(dropdownSelect.value).toEqual(example);
  });
});
