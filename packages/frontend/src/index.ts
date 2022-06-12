import viewer from './viewer';
import editor from './editor';

if (process.env.REACT_APP_ENTRY === 'viewer') {
  viewer();
}

if (process.env.REACT_APP_ENTRY === 'editor') {
  editor();
}
