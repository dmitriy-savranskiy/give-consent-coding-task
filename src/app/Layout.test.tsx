import renderer from 'react-test-renderer';
import { mockComponentForSnapshot } from '../common/testUtils/helpers';
import { Layout } from './Layout';

jest.mock('@material-ui/core', () => {
  return {
    ListItem: mockComponentForSnapshot('ListItem'),
    List: mockComponentForSnapshot('List'),
    Container: mockComponentForSnapshot('Container'),
  };
});

jest.mock('react-router-dom', () => {
  return {
    NavLink: mockComponentForSnapshot('NavLink'),
  };
});

describe('Layout component', () => {
  it('should match snapshot', () => {
    const component = renderer.create(
      <Layout>
        <span>content</span>
      </Layout>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
