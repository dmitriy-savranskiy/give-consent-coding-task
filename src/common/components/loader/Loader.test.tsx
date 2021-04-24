import { create } from 'react-test-renderer';
import { Loader } from './Loader';

describe('Loader component', () => {
  test('should match snapshot', () => {
    const component = create(<Loader />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
