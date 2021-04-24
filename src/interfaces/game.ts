import { IconButtonProps } from "../components/lib/Button";

export interface IPosition {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface SelectionControl extends IconButtonProps {
  id: string;
  border: number;
  position: IPosition;
  canBeat: string[];
}
