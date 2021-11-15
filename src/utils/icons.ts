import shiba from '../icons/shiba.svg';
import dog from '../icons/dog.svg';

interface IconMap {
  [key: string]: typeof shiba;
}

const icons: IconMap = {
  shiba,
  dog,
};

export default icons;
