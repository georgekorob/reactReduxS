import { render, screen } from '@testing-library/react';
import SamuraiJSAPP from "./App";
import {unmountComponentAtNode} from "react-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<SamuraiJSAPP />, div);
  unmountComponentAtNode(div);
});
